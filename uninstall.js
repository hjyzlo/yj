//service.js

const path = require("path")
const nodeWindow =require("node-windows")
const Service = nodeWindow.Service;

let svc = new Service({
  name: "yj", //名称
  script: path.resolve("./app.js"), //node执行入口文件
  //nodeOptions: [],
});

svc.on('uninstall', function () {
  if (!svc.exists) {
      console.log('服务卸载完成');
  }
});

svc.uninstall();

//uninstall.js


