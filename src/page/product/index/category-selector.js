/**
 @Author：Wyunfei
 @Date：2019/4/11/19:04
 @FileName: category-selector.js
 */
import React from 'react'
import Mutil from '../../../utils/mm.js'
import Product from '../../../service/product-service.js'
const _mm = new Mutil()
const _product = new Product()

class CategorySeletor extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }
    componentDidMount() {
        this.loadFirstCategory()
    }
    componentWillReceiveProps(nextProps, nextContext) {
        let categoryIdChange          = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange    = this.props.parentCategoryId !== nextProps.parentCategoryId;
        // 数据没有发生变化的时候，直接不做处理
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        // 假如只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId     : nextProps.categoryId,
                secondCategoryId    : 0
            });
        }
        // 有两级品类
        else{
            this.setState({
                firstCategoryId     : nextProps.parentCategoryId,
                secondCategoryId    : nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory();
            });
        }
    }
    // 加载一级分类
    loadFirstCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                firstCategoryList: res
            })
        }, errMsg => {
            _mm.errorTips(errMsg)
        })
    }
    // 加载二级分类
    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            })
        }, errMsg => {
            _mm.errorTips(errMsg)
        })
    }
    // 选择一级分类
    onFirstCategoryChange(e) {
        let newVal = e.target.value
        this.setState({
            firstCategoryId: newVal,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            // 更新二级分类
            this.loadSecondCategory()
            this.onPropsCategoryChange()
        })
    }
    // 选择二级分类
    onSecondCategoryChange(e) {
        let newVal = e.target.value
        this.setState({
            secondCategoryId: newVal
        }, () => {
            // 传递给父组件
            this.onPropsCategoryChange()
        })
    }
    // 传给父组件选中的结果
    onPropsCategoryChange() {
        // 如果有二级分类
        if (this.state.secondCategoryId) {
            this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
        } else { // 如果只有一级分类
            this.props.onCategoryChange(this.state.firstCategoryId, 0)
        }
    }
    render() {
        return (
            <div className="form-group">
                <div className="col-md-2">
                    <label className="control-label">所属分类</label>
                </div>
                <div className="col-md-3 form-inline">
                    <select
                        value={this.state.firstCategoryId}
                        className="form-control cate-selet"
                            onChange={ e => this.onFirstCategoryChange(e)}
                    >
                        <option value=''>请选择一级品类</option>
                        {
                            this.state.firstCategoryList.map((category, index) => <option value={category.id}>{ category.name }</option>)
                        }


                    </select>
                    {
                        this.state.secondCategoryList.length > 0 ?
                            <select className="form-control cate-selet"
                                    value={this.state.secondCategoryId}
                                onChange={ e => this.onSecondCategoryChange(e)}
                            >
                                <option value=''>请输入二级品类</option>
                                {
                                    this.state.secondCategoryList.map((category, index) => <option value={category.id}>{ category.name }</option>)
                                }
                            </select> : null
                    }
                </div>
            </div>
        )
    }
}

export default CategorySeletor
