import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import './index.css';

import Home from './page/home/index.js'
import Login from './page/login/index.js'
import Layout from './components/layout/index'
// import './config/setup-prox'

class App extends React.Component {
    render(){
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home}/>
                </Switch>
            </Layout>
        )
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' render = { props => LayoutRouter }/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
