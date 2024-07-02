const mongoose = require("mongoose")
const productsSchema = new mongoose.Schema({
    code:{type:String,required:false},
    order:{type:String,required:false},
    cost:{type:Number,required:false},
    price:{type:Number,required:false},
    stat:{type:Boolean,required:false},
    creatDate:{type:Date,required:false},
})
module.exports = mongoose.model('products',productsSchema)