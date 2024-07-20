const mongoose = require("mongoose")
const detailsSchema = new mongoose.Schema({
    products:[{type:mongoose.Schema.Types.ObjectId,ref:'products',required:true}],
    discount:{type:Number,required:false,default:0},
    note:{type:String,required:false},
    creatDate:{type:Date,required:false,default:Date.now},
})
module.exports = mongoose.model('details',detailsSchema)