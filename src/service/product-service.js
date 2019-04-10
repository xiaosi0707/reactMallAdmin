/**
 @Author：Wyunfei
 @Date：2019/4/8/20:18
 @FileName: user-service.js
 */

import Util from '../utils/mm.js';

const _mm = new Util();

class User {
    // 商品列表
    getProductList(pageNum) {
        return _mm.request({
            url: '/manage/product/list.do',
            data: {
                pageNum
            }
        })
    }
    // 上下架
    setProductStatus(productId,status) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: {
                productId : productId,
                status    : status
            }
        })
    }
}

export default User
