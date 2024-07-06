const express = require("express")
const { pAdd, login, pQuery,authenticateToken,upload } = require("./op")
const route = express.Router()

route.get("/",(req,res)=>{
    res.json({status:200})
})
route.post("/pAdd",pAdd,upload.single("singleFile"),(req,res)=>{
    res.json(newProducts)
})
route.post("/login",login)
route.post("/pQuery",authenticateToken,pQuery)
module.exports = route