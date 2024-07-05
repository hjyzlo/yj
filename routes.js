const express = require("express")
const { pAdd, login, pQuery,authenticateToken } = require("./op")
const route = express.Router()

route.get("/",(req,res)=>{
    res.json({status:200})
})
route.post("/pAdd",authenticateToken,pAdd)
route.post("/login",login)
route.post("/pQuery",authenticateToken,pQuery)
module.exports = route