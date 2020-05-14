import React, { Component } from "react"
import "./App.css"
import { Router, Route, Redirect } from "react-router-dom"
import {createBrowserHistory} from "history"

//import { createBrowserHistory } from 'history'



import Login from "../web/Login/container"
import Register from "../web/Register/container"
import AdminRegister from "../web/adminRegister/container"
import AdminDeshboardContainer from "../web/adminDashboard/container"
import UserDeshboardContainer from "../web/userDashboard/container"
const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" render={() => <Redirect to="/Login"/>} />
          <Route path={"/Login"} component={Login} />
          <Route path={"/register"} component={Register} />
          <Route path={"/adminRegister"} component={AdminRegister} />
          <Route path={"/adminDashboard"} component={AdminDeshboardContainer} />
          <Route path={"/userDashboard"} component={UserDeshboardContainer} />
        </div>
      </Router>
    )
  }
}

export default App

