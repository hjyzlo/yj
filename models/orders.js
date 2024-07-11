const mongoose = require("mongoose")
const ordersSchema = new mongoose.Schema({
    order:{type:Number,required:true},
    orderName:{type:String,required:true}
})
module.exports = mongoose.model('orders',ordersSchema)