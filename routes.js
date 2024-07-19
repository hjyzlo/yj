const express = require("express")
const { pAdd, login, pQuery,oQuery,authenticateToken,upload,oAdd } = require("./op")
const route = express.Router()
route.post("/pAdd",upload.single("singleFile"),pAdd)
route.post("/oAdd",authenticateToken,oAdd)
route.post("/login",login)
route.post("/pQuery",authenticateToken,pQuery)
route.post("/oQuery",authenticateToken,oQuery)
module.exports = route