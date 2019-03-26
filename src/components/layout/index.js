/**
 @Author：Wyunfei
 @Date：2019/3/25/14:17
 @FileName: index.js
 */

import React from 'react'
import TopNav from '../top-nav/index'
import SideNav from '../side-nav/index'
import './theme.css';
import './index.scss';

class Layout extends React.Component{
    render() {
        return (
            <div id='wrapper'>
                <TopNav />
                <SideNav />
                { this.props.children }
            </div>
        )
    }
}

export default Layout
