const express = require("express")
const { pAdd, login, pQuery,authenticateToken,upload,test } = require("./op")
const route = express.Router()

route.get("/",(req,res)=>{
    res.json({status:200})
})
route.post("/pAdd",pAdd)
route.post("/login",login)
route.post("/pQuery",authenticateToken,pQuery)
route.post("/test",upload.single("singleFile"),(req,res)=>{

})
module.exports = route