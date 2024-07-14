exports.appPort = 80
exports.mongoUrl = "mongodb://127.0.0.1:27018/test"
exports.Pinfo = {
    printerName:'P1S',
    qrcodeX:1,
    qrcodeY:1,
    textX:20,
    textY:1,
    labelWidth:25,
    labelHeight:15,
    margin:1,
    qrcodeWidth:13,
    fontHeight:3,
    orientation:90
}
exports.wx = {
    openid:["oyBpq5Ag-Mi94ffbsMieOxHi_gQ0","oyBpq5PNcdUttS5PI4Ydcyb058dA"],
    url:"https://api.weixin.qq.com/sns/jscode2session?appid=wxfda89aeb5375ff83&secret=d10a02f7b5f0e222ac80570ed80fc85e&js_code=1313ljj&grant_type=authorization_code"
}
exports.mjwt = {
    secret :'1313ljj',
    expiresIn:{ expiresIn: '1h' }
}
exports.ul = {
    basedir:'imgs'
}
module.exports = exports