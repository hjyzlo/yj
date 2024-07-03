const products = require("./models/products")
const mongoose = require("mongoose")
const {DTPWeb} = require("dtpweb")
const {Pinfo} = require("./config")
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
        console.log(req.body)
        const newProducts = await products.create(req.body)
        console.log(newProducts.get("_id").toString())
        await pLabel(newProducts.get("_id").toString(),newProducts.get("price").toString())
        
        res.json(newProducts)
        
    }catch(error){

    }
}
exports.pQuery= async (req,res)=>{
    try{
        console.log(req.body)
        const newProducts = await products.findOne(req.body._id)
        console.log(newProducts.get("_id").toString())
        await pLabel(newProducts.get("_id").toString(),newProducts.get("price").toString())
        
        res.json(newProducts)
        
    }catch(error){

    }
}
module.exports = exports