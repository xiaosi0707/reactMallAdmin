/**
 @Author：Wyunfei
 @Date：2019/4/15/14:29
 @FileName: index.js
 */
import React from 'react'
import { Link } from 'react-router-dom'
import TableList from '../../../utils/table-list'
import PageTitle from '../../../components/page-title/index.js';
import Utils from '../../../utils/mm.js'
import Product  from '../../../service/product-service.js'
import ProductList from "../index";

const _mm   = new Utils();
const _product = new Product();

class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list                : [],
            parentCategoryId    : this.props.match.params.categoryId || 0
        };
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    // 更新分类的名字
    onUpdateName(categoryId, categoryName){
        let newName = window.prompt('请输入新的分类名称', categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName : newName
            }).then(res => {
                _mm.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    componentDidUpdate(prevProps, prevState){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId : newId
            }, () => {
                this.loadCategoryList();
            });
        }
    }
    // 加载分类列表
    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list : res
            });
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    render() {
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear"
                           onClic



                           k={(e) => this.onUpdateName(category.id, category.name)}>修改名称 </a>
                        {
                            category.parentId === 0
                                ? <Link to={`/product-category/${category.id}`}> 查看子分类</Link>
                                : null
                        }
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="分类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加分类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父分类ID: {this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['分类ID', '分类名称', '操作']}>
                    {listBody}
                </TableList>
            </div>
        )
    }
}

export default CategoryList
