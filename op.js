const products = require("./models/products")
const orders = require("./models/orders")
const details = require("./models/details")
const mongoose = require("mongoose")
const {DTPWeb} = require("dtpweb")
const {Pinfo,wx,mjwt,ul} = require("./config")
const fly = require("flyio")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const uuid = require("uuid")
const fs = require("fs")
const Console = require("console").Console
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
const logger = new Console({ stdout: output, stderr: errorOutput });
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
            api.drawText({text: price + '元', x:Pinfo['textX'],y:Pinfo['textY'],fontHeight:Pinfo['fontHeight'],orientation:Pinfo['orientation']});
            api.draw2DQRCode({text:_id,x:Pinfo['qrcodeX'],y:Pinfo['qrcodeY'],width:Pinfo['qrcodeWidth'],orientation:Pinfo['orientation']})
            // 4. 结束绘制操作，开始打印
            api.commitJob(() => {
                // 5. 关闭已经打开的打印机
                api.closePrinter()
            });
        }
    });

}
exports.pAdd = async (req,res)=>{
        const newProducts = await products.create({...JSON.parse(req.body.data),'imgUrl':req.imgUrl})
        const _id = newProducts.get("_id").toString()
        await pLabel(_id,newProducts.get("price").toString())  
        res.sendStatus(200)
}
exports.oAdd = async (req,res)=>{
    //const order = await orders.create(req.body.data)
    await orders.create(req.body).then(()=>res.sendStatus(200))
}
exports.dAdd = async (req,res)=>{
    //const order = await orders.create(req.body.data)
    console.log(req.body)
    await details.create(req.body).then(products.updateMany({_id:{$in:req.body.products}},{stat:false}).then(()=>res.sendStatus(200)))
}
exports.pQuery= async (req,res)=>{
    try{
        await products.find({...req.body.query,stat:true}).populate('order').limit(10).skip(req.body.skip).then(data=>res.json(JSON.stringify(data)))      
    }catch(error){
        console.log(error)
    }
}
exports.dpQuery= async (req,res)=>{
    console.log(req.body)
        products.find({_id:{$in:req.body.products}}).populate('order').then(data=>res.json(data))      
}
exports.oQuery= async (req,res)=>{
    try{
        await orders.find().then(data=>{
            res.json(JSON.stringify(data))
        })      
    }catch(error){
        console.log(error)
    }
}
exports.dQuery= async (req,res)=>{
    await details.aggregate([
        {$project:{'products':1,'summaryC':1,'summaryP':1,'count':1,'discount':1,'imgUrl':1,'note':1,'creatDate':{$dateToString:{'format':'%Y-%m-%d','date':{"$add":["$creatDate",28800000]}}}}},
        {$match:{'creatDate':{$gte:req.body.sDate,$lte:req.body.eDate}}}
    ]).then(data=>{res.json(data)})
}
exports.login = async(req,res)=>{
    const code = req.body.code
    const url = wx.url.replace('1313ljj',code)
    let result = await fly.get(url)
    const userinfo = result.data
    const openid = JSON.parse(userinfo).openid
    logger.log(openid)
    const user = {id:openid}
    res.json(jwt.sign(user,mjwt.secret,mjwt.expiresIn))
}
exports.authenticateToken=(req, res, next)=>{
    const token = req.headers.token;
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, mjwt.secret, (err, data) => {
        if (err || wx.openid.indexOf(data.id)==-1) {
            return res.sendStatus(403);
        }
        next();
    });
}
module.exports = exports