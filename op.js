const products = require("./models/products")
const mongoose = require("mongoose")
exports.pAdd = async (req,res)=>{
    try{
        console.log(req.body)
        const newProducts = await products.create(req.body)
        console.log(newProducts.get("_id").toString())
        _id  code => await dayin (_id , code)
        
        res.json(newProducts)
        
    }catch(error){

    }
}
module.exports = exports