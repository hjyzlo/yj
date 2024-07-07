const products = require("./models/products")
const mongoose = require("mongoose")
const {DTPWeb} = require("dtpweb")
const {Pinfo,wx,mjwt,ul} = require("./config")
const fly = require("flyio")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const uuid = require("uuid")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, ul.basedir)
    },
    filename: function (req, file, cb) {
        const origin = file.originalname;
        let extension = origin.substr(origin.lastIndexOf('.') + 1);
        extension = extension.toLowerCase();
        const main = uuid.v1();
        const imgUrl = main + '.' + extension;
        req.imgUrl = imgUrl
        cb(null, imgUrl)
    }
  })
  exports.upload = multer({ storage: storage })
pLabel = async (_id,price)=>{
    let api = DTPWeb.getInstance();
    DTPWeb.checkServer((value) => {
        api = value;
        if (!value) {
                console.log("No Detected DothanTech Printer Helper!");
        }
    });
    
    if (!api) return ;
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
                return 1
            });
        }
    });

}
exports.pAdd = async (req,res)=>{
    try{
        const newProducts = await products.create({...JSON.parse(req.body.data),'imgUrl':req.imgUrl})
        const _id = newProducts.get("_id").toString()
        const result = await pLabel(_id,newProducts.get("price").toString())    
        if(result!=1){
           // products.remove({'_id':_id})
           
        }
        
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
exports.test = (req,res)=>{
    //products.findOne({}).then(data=>res.json(data))
    console.log(req.body.skip)
    products.find().limit(3).skip(req.body.skip).then(data=>res.json(JSON.stringify(data)))
    
}
module.exports = exports