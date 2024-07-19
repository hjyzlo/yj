const mongoose = require("mongoose")
const ordersSchema = new mongoose.Schema({
    orderName:{type:String,required:true,unique: true}
})
module.exports = mongoose.model('orders',ordersSchema)