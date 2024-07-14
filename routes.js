const express = require("express")
const { pAdd, login, pQuery,oQuery,authenticateToken,upload,checkToken } = require("./op")
const route = express.Router()

route.get("/",(req,res)=>{
    res.json({status:200})
})
route.post("/pAdd",upload.single("singleFile"),pAdd)
route.post("/login",login)
route.post("/pQuery",authenticateToken,pQuery)
route.post("/oQuery",authenticateToken,oQuery)
route.post("/checkToken",authenticateToken,checkToken)
module.exports = route