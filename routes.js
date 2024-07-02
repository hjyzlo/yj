const express = require("express")
const { pAdd } = require("./op")
const route = express.Router()

route.get("/",(req,res)=>{
    res.json({status:200})
})
route.post("/",pAdd)
module.exports = route