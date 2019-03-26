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
                        resolve(res.data. res.msg)
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
}

export default Mutil