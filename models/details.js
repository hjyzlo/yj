const mongoose = require("mongoose")
const detailsSchema = new mongoose.Schema({
    products:[{type:mongoose.Schema.Types.ObjectId,ref:'products',required:true}],
    summaryC:{type:Number,required:false,default:0},
    summaryP:{type:Number,required:false,default:0},
    count:{type:Number,required:false,default:0},
    discount:{type:Number,required:false,default:0},
    imgUrl:{type:String,required:false},
    note:{type:String,required:false},
    creatDate:{type:Date,required:false,default:Date.now},
})
module.exports = mongoose.model('details',detailsSchema)