const express = require("express")
const { pAdd, login, pQuery,authenticateToken,upload } = require("./op")
const route = express.Router()

route.get("/",(req,res)=>{
    res.json({status:200})
})
route.post("/pAdd",authenticateToken,pAdd)
route.post("/login",login)
route.post('/upload',upload.single("singleFile"))
route.post("/pQuery",authenticateToken,pQuery)
module.exports = route