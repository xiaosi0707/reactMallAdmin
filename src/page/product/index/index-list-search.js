/**
 @Author：Wyunfei
 @Date：2019/4/11/9:49
 @FileName: index-list-search.js
 */
import React from 'react'

class ListSearch extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchType: 'productId',// productId/productName
            searchKeyword: ''

        }
    }
    onValueChange(e) {
        let value = e.target.value.trim()
        let name = e.target.name

        this.setState({
            [name]: value
        })
    }
    // 按钮搜索
    onSearch() {
        this.props.onSearch(this.state.searchType, this.state.searchKeyword)
    }
    // 回车提交
    onSearchKeywordKey(e) {
        if (e.keyCode === 13) this.onSearch()
    }
    render() {
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <div className='form-inline'>
                        <div className='form-group'>
                            <select name="" id=""
                                    className='form-control'
                                    onChange={e => this.onValueChange(e)}
                                    name='searchType'
                            >
                                <option value="productId">按商品ID查询</option>
                                <option value="productName">按商品名称查询</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='关键词'
                                name='searchKeyword'
                                onKeyUp={ e => this.onSearchKeywordKey(e) }
                                onChange={e => this.onValueChange(e) }/>
                        </div>
                        <button className='btn btn-primary' onClick={ e => this.onSearch() }>搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListSearch
