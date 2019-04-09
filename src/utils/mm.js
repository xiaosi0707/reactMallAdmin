/**
 @Author：Wyunfei
 @Date：2019/3/26/9:07
 @FileName: mm.js
 */
import $ from 'jquery'
class Mutil {
    request(params) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: params.type || 'get',
                url: params.url || '',
                dataType: params.dataType ||  'json',
                data: params.data || null,
                success: res => {
                    if (res.status === 0) {
                        resolve(res.data, res.msg)
                        // 强制登录
                    } else if (res.status === 10) {
                        this.doLogin()
                    } else {
                        reject(res.msg || res.data)
                    }
                },
                error: err => {
                    reject(err.statusText)
                }
            })
        })
    }
    // 跳转到登录
    doLogin () {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
    }
    // 获取URL参数
    getUrlParam(name) {
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;

    }
    // 错误提示
    errorTips (errMsg) {
        alert(errMsg || '好像哪里不对了')
    }
    // 本地存储 存储
    setStorage(name, data) {
        let dataType = typeof data
        // json类型
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data))
            // 基础类型
        } else if( ['number', 'string', 'boolean'].indexOf(dataType) >= 0 ) {
            window.localStorage.setItem(name, data)
        } else {
            alert('该类型不能用于本地存储')
        }
    }
    // 本地存储 - 取出
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data)
        } else {
            return ''
        }
    }
    // 本次存储 - 删除
    removeStorage(name) {
        window.localStorage.removeItem(name)
    }
}

export default Mutil
