/**
 @Author：Wyunfei
 @Date：2019/3/26/16:14
 @FileName: asdasdasdasdasd.js
 */
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/manage", {
        target: "http://admintest.happymmall.com" ,
        changeOrigin: true,
    }))
};
