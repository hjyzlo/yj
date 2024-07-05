const express = require("express")
const { pAdd, login, pQuery } = require("./op")
const route = express.Router()

route.get("/",(req,res)=>{
    res.json({status:200})
})
route.post("/",pAdd)
route.post("/login",login)
route.post("/pQuery",pQuery)
module.exports = route