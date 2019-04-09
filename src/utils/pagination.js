/**
 @Author：Wyunfei
 @Date：2019/4/9/17:07
 @FileName: pagination.js
 */
import React from 'react'
import Pagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

// 分页组件
class RcPagination extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <Pagination {...this.props} hideOnSinglePage showQuickJumper/>
                </div>
            </div>
        )
    }
}
export default RcPagination
