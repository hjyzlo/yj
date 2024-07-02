const express = require("express")
const route = express.Router()

route.get("/",(req,res)=>{
    res.json({status:200})
})
module.exports = route