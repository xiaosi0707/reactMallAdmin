/**
 @Author：Wyunfei
 @Date：2019/3/26/10:05
 @FileName: setup-prox.js
 */
const express = require('express')
const proxy = require('http-proxy-middleware')

const app = express()

module.exports = function(app) {
    app.use(proxy('/manage', {
        target: 'http://admintest.happymall.com',
        changeOrigin: true
    }))
    // app.use(proxy('/*.svg', { target: 'http://localhost:5000/' }))
}
