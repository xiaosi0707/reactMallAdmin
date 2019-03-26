/*
* @Author: Rosen
* @Date:   2018-01-25 17:37:22
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 12:29:31
*/
import React from 'react'
import './index.scss'
import Mutil from '../../utils/mm'
const _mm = new Mutil

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    // 当用户名发生改变
    onInputChange (e) {
        let inputValue = e.target.value,
            inputName = e.target.name

        this.setState({
            [inputName]: inputValue
        })
    }
    // 提交表单
    onSubmit () {
        _mm.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        }).then(res => {
            console.log(res)
        })
    }
    render(){
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="请输入用户名"
                                    onChange={ (e) => this.onInputChange(e) }
                                    />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="请输入密码"
                                    onChange={ e => this.onInputChange(e) }
                                   />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={this.onSubmit.bind(this)}>登录</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;
