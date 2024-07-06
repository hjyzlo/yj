const express = require("express")
<<<<<<< HEAD
const { pAdd, login, pQuery ,upload} = require("./op")
=======
const { pAdd, login, pQuery,authenticateToken } = require("./op")
>>>>>>> 462c41d0e4706adb6ce923d9d72bd5d9c569f8a9
const route = express.Router()

route.get("/",(req,res)=>{
    res.json({status:200})
})
route.post("/pAdd",authenticateToken,pAdd)
route.post("/login",login)
<<<<<<< HEAD
route.post("/pQuery",pQuery)
route.post('/upload',upload.single("singleFile"))
=======
route.post("/pQuery",authenticateToken,pQuery)
>>>>>>> 462c41d0e4706adb6ce923d9d72bd5d9c569f8a9
module.exports = route