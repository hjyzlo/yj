const products = require("./models/products")
exports.pAdd = async (req,res)=>{
    try{
        console.log(req.body)
        const newProducts = await products.create(req.body) 
        console.log(newProducts)
        res.json(newProducts)
    }catch(error){

    }
}
module.exports = exports