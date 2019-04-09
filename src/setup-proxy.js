/**
 @Author：Wyunfei
 @Date：2019/4/9/11:50
 @FileName: setup-proxy.js
 */
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/manage", {
        target: "http://admintest.happymmall.com" ,
        changeOrigin: true,
    }))
    app.use(proxy("/user/logout.do", {
        target: "http://admintest.happymmall.com" ,
        changeOrigin: true,
    }))
};
