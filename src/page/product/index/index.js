/**
 @Author：Wyunfei
 @Date：2019/4/9/18:22
 @FileName: index.js
 */
import React from 'react';
import { Link }     from 'react-router-dom';
import RcPagination from '../../../utils/pagination'
import TableList from '../../../utils/table-list'
import ListSearch from './index-list-search'
import PageTitle from '../../../components/page-title/index.js';
import Utils from '../../../utils/mm.js'
import Product  from '../../../service/product-service.js'

const _mm   = new Utils();
const _product = new Product();

class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        };
    }
    componentDidMount(){
        this.loadProductList()
    }
    loadProductList(){
        let listParam = {}
        listParam.listType = this.state.listType
        listParam.pageNum = this.state.pageNum
        // 如果是搜索的话需要传入搜索类型和关键字
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType
            listParam.searchKeyword = this.state.searchKeyword
        }
        // 请求API
        _product.getProductList(listParam).then(res => {
            this.setState(res, () => {

            });
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    // 改变商品状态，上架 / 下架
    onProductStatusChange(e,productId,status){
        let confrimTips = status === 1 ? '您确定要下架该商品吗？' : '您确定要上架该商品吗？'
        let newStatus = status === 1 ? 2 :1;
        if(window.confirm(confrimTips)){
            _product.setProductStatus(productId, newStatus).then((res) => {
                console.log(res)
                _mm.successTips(res);
                this.loadProductList();
            },(errMsg) =>{
                console.log(errMsg)
                _mm.errorTips(errMsg);
            })
        }
    }
    // 搜索
    onSearch(searchType, searchKeyword) {
        this.setState({
            listType: searchKeyword === '' ? 'list' : 'search',
            pageNum: 1,
            searchType,
            searchKeyword
        }, () => {
            this.loadProductList()
        })
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadProductList();
        });
    }
    render(){
        let tableHeads = [
                {name: '商品ID', width: '10%'},
                {name: '商品信息', width: '50%'},
                {name: '价格', width: '10%'},
                {name: '状态', width: '15%'},
                {name: '操作', width: '15%'},
            ];
        let tableBody = this.state.list.map((product, index) => {
            return (
                <tr key={index}>
                    <td>{ product.id }</td>
                    <td>
                        <p>{product.name}</p><p>{product.subtitle}</p>
                    </td>
                    <td>{product.price}</td>
                    <td className="productStatus">
                        <span>{product.status === 1 ? "在售" : "已下架"}</span>
                        <span className="btn btn-warning btn-xs" onClick={e => this.onProductStatusChange(e,product.id,product.status)}>
                        {product.status === 1 ? "下架" : "上架"}
                    </span>
                    </td>
                    <td >
                        <Link className="oper" to={`/product/detail/${product.id}`}>查看</Link>
                        <Link className="oper" to={`/product/save/${product.id}`}>编辑</Link>
                    </td>
                </tr>
            )
        })

        return (
            <div id="page-wrapper">
                <PageTitle title="商品管理">
                    <Link to="/product/save">
                        <div className="btn btn-primary btn-add">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </div>
                    </Link>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}} />
                <TableList tableHeads={tableHeads}>
                    {
                        tableBody
                    }
                </TableList>
                <RcPagination
                    current={this.state.pageNum}
                    total={this.state.total}
                    onChange={(pageNum) => { this.onPageNumChange(pageNum) }} />
            </div>
        );
    }
}

export default ProductList;
