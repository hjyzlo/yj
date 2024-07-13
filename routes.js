const express = require("express")
const { pAdd, login, pQuery,oQuery,authenticateToken,upload,test } = require("./op")
const route = express.Router()

route.get("/",(req,res)=>{
    res.json({status:200})
})
route.post("/pAdd",upload.single("singleFile"),pAdd)
route.post("/login",login)
route.post("/pQuery",authenticateToken,pQuery)
route.post("/oQuery",oQuery)
route.post('/test',test)
route.get('/test',test)
module.exports = route