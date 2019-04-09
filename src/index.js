import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import './index.css';

import Home from './page/home/index.js'
import Login from './page/login/index.js'
import Layout from './components/layout/index'
import ErrorPage from './page/error/index.js';
import UserList from './page/user/index.js';

class App extends React.Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' render={ props => (
                        <Layout>
                            <Switch>
                                <Route exact path='/' component={Home}></Route>
                                <Route path='/product' component={Home}></Route>
                                <Route exact path='/user/index' component={UserList}></Route>
                                <Route exact from='/user' to='/user/index'></Route>
                                <Route path='/product-category' component={Home}></Route>
                                <Route component={ErrorPage}></Route>
                            </Switch>
                        </Layout>
                    )} />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
