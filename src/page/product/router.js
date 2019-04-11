/**
 @Author：Wyunfei
 @Date：2019/4/9/18:19
 @FileName: router.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import ProductList from './index/index.js'

class ProductRouter extends React.Component {
    render(){
        return (
                <Switch>
                    <Route exact path='/product/index' component={ ProductList }/>
                </Switch>
        )
    }
}

export default ProductRouter