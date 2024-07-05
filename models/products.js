const mongoose = require("mongoose")
const productsSchema = new mongoose.Schema({
    order:{type:String,required:false},
    cost:{type:Number,required:false},
    price:{type:Number,required:false},
    stat:{type:Boolean,required:false,default:true},
    creatDate:{type:Date,required:false,default:Date.now},
})
module.exports = mongoose.model('products',productsSchema)