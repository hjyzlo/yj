const mongoose = require("mongoose")
const productsSchema = new mongoose.Schema({
    order:{type:mongoose.Schema.Types.ObjectId,ref:'orders',required:true},
    code:{type:String,required:false},
    type:{type:Number,required:true},
    cost:{type:Number,required:false},
    price:{type:Number,required:true},
    stat:{type:Boolean,required:false,default:true},
    imgUrl:{type:String,required:false},
    creatDate:{type:Date,required:false,default:Date.now},
})
module.exports = mongoose.model('products',productsSchema)