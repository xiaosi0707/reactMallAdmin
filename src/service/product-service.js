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
    // 检查保存商品的表单数据
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证通过'
        };
        // 判断用户名为空
        if(typeof product.name !== 'string' || product.name.length ===0){
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        // 判断描述不能为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length ===0){
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        // 验证品类ID
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status: false,
                msg: '请选择商品品类！'
            }
        }
        // 判断商品价格为数字，且大于0
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的商品价格！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }

        return result;
    }
    // 保存商品
    saveProduct(product){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/save.do',
            data    : product
        });
    }
    //获取商品详情
    getdetail(productId){
        return _mm.request({
            url     : '/manage/product/detail.do',
            data    : {
                productId : productId
            }
        });
    }
}

export default User
