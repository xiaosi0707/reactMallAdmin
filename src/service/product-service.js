/**
 @Author：Wyunfei
 @Date：2019/4/8/20:18
 @FileName: user-service.js
 */

import Util from '../utils/mm.js';

const _mm = new Util();

class User {
    // 商品列表
    getProductList(listParam) {
        console.log(listParam)
        let url = ''
        let data = {}
        if (listParam.listType === 'list') {
            url =  '/manage/product/list.do'
            data.pageNum = listParam.pageNum
        } else if(listParam.listType === 'search') {
            url =  '/manage/product/search.do'
            data.pageNum = listParam.pageNum
            data[listParam.searchType] = listParam.searchKeyword
        }
        return _mm.request({
            type: 'post',
            url,
            data
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
    // 根据父品类id获取品类列表
    getCategoryList(parentCategoryId) {
        return _mm.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        })
    }
}

export default User
