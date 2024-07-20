const express = require("express")
const route =require("./routes")
const bp = require("body-parser")
const mongoose = require("mongoose")
const config = require("./config")

process.on('uncaughtException', (err) => {
    console.log('========');
    console.log(err);
    console.log('========');
})

process.on('unhandledRejection', (err) => {
    console.log('========');
    console.log(err);
    console.log('========');
})
const app = express()
mongoose.set('strictQuery', true)
mongoose.connect(config.mongoUrl)
app.use(bp.json())
app.use(bp.urlencoded({extended:false}))
app.use('/imgs',express.static('imgs'))
app.use(route)
app.listen(config.appPort)