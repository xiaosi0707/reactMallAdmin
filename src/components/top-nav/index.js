/**
 @Author：Wyunfei
 @Date：2019/3/25/14:28
 @FileName: index.js
 */

import React from 'react'
import { Link } from 'react-router-dom'
import Mutil from '../../utils/mm.js'
import User from '../../service/user-service.js'
const _mm = new Mutil()
const _user = new User()

class NavTop extends React.Component{
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            username: _mm.getStorage('userInfo').username
        }
    }
    // 退出登录
    onLogout () {
        _user.logout().then(res => {
            _mm.removeStorage('userInfo')
            window.location.href = '/login'
        }, errMsg => {
            _mm.errorTips(errMsg)
        })
    }
    render() {
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>JIYUN</b>MMALL</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username ?
                                <span>欢迎，{ this.state.username }</span>
                                : <span>欢迎</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={(e) => this.onLogout()}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavTop
