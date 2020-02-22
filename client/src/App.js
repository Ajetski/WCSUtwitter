import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './pages/login/login'
import Home from './pages/home/home'
import Signup from './pages/signup/signup'
import NotFound from './pages/notfound/notfound'

export default class App extends Component{
  render (){
    return(
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/home' component={Home}></Route>
          <Route path='/signup' component={Signup}></Route>
          <Route exact path='/' component={Home}></Route>
          <Route path='*' component={NotFound}></Route>
        </Switch>
        </Router>
    )
  }
};
