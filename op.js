const products = require("./models/products")
const mongoose = require("mongoose")
const {DTPWeb} = require("dtpweb")
const {Pinfo,wx,mjwt} = require("./config")
const fly = require("flyio")
const jwt = require("jsonwebtoken")
pLabel = async (_id,price)=>{
    let api = DTPWeb.getInstance();
    DTPWeb.checkServer((value) => {
        api = value;
        if (!value) {
                console.log("No Detected DothanTech Printer Helper!");
        }
    });
    if (!api) return;
    api.openPrinter(Pinfo['printerName'], (success) => {
        if(success) {
            // 2. 创建一个指定大小的标签任务
            api.startJob({width: Pinfo['labelWidth'], height: Pinfo['labelHeight']});
            // 3. 在标签纸上打印目标字符串
            api.drawText({text:'￥' + price, x:Pinfo['textX'],y:Pinfo['textY'],fontHeight:Pinfo['fontHeight'],orientation:Pinfo['orientation']});
            api.draw2DQRCode({text:_id,x:Pinfo['qrcodeX'],y:Pinfo['qrcodeY'],width:Pinfo['qrcodeWidth'],orientation:Pinfo['orientation']})
            // 4. 结束绘制操作，开始打印
            api.commitJob(() => {
                // 5. 关闭已经打开的打印机
                api.closePrinter();
            });
        }
    });

}
exports.pAdd = async (req,res)=>{
    try{
        const newProducts = await products.create(req.body)
        await pLabel(newProducts.get("_id").toString(),newProducts.get("price").toString())     
        res.json(newProducts)
        
    }catch(error){
        console.log(error)
    }
}
exports.pQuery= async (req,res)=>{
    try{
        const product = await products.findOne({'_id':req.body._id})
        res.json(product)       
    }catch(error){
        console.log(error)

    }
}
exports.login = async(req,res)=>{
    const code = req.body.code
    const url = wx.url.replace('1313ljj',code)
    let result = await fly.get(url)
    const userinfo = result.data
    const openid = JSON.parse(userinfo).openid
    const user = {id:openid}
    res.json(jwt.sign(user,mjwt.secret,mjwt.expiresIn))
}
exports.authenticateToken=(req, res, next)=>{
    const token = req.headers.token;
    console.log(token)
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, mjwt.secret, (err, data) => {
        if (err || wx.openid.indexOf(data.id)) return res.sendStatus(403);
        next();
    });
}

module.exports = exports