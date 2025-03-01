//service.js

const path = require("path")
const nodeWindow =require("node-windows")
const Service = nodeWindow.Service;

let svc = new Service({
  name: "YJ", //名称
  description: "YJ", //描述
  script: path.resolve("./app.js"), //node执行入口文件
  //nodeOptions: [],
});

svc.on("install", function () {
  svc.start();
  if(svc.exists){
    console.log('服务安装成功')
  }
});

svc.install();
