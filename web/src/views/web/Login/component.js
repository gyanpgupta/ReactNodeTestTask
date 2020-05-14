import React, { Component } from "react"
import { Redirect, Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { message } from 'antd';
class Login extends Component {
     constructor(props) {
      super(props);
      this.state = {
        email:'',
        password:'',
        err: {}
    }
  }
  componentWillReceiveProps(nextProps){
    const {loginMessage , loginStatus} = nextProps
    if(!loginStatus  && loginMessage){
      message.info(loginMessage);
    }
  }

    handleChange=(event)=> {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit=(event)=> {
    event.preventDefault()
    const err = {}
    const {email , password} = this.state
    if (email === '' || email.trim() === '') {
      err.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      err.email = 'Invalid email';
    }
    
    if (password === '' ) {
      err.password = 'Enter  Valid Password.'
    }
    
    this.setState({ err })
    
    if (!Object.keys(err).length) {
        const { userLogin } = this.props
        const data = {
          mail: email,
          pass:password
        }
      userLogin(data)
    }
  }


  render() {
    const {phase , data , loginStatus } = this.props
    const {email , password , err} = this.state

    if(phase === "success" && data && data.user && data.user["UserType.name"] === 'User' && loginStatus){
      return(
        <Redirect to={'/userDashboard'}/>   
        )
    }
    if(phase === "success" && data &&  data.user && data.user["UserType.name"] === 'Admin' && loginStatus){
      return(
        <Redirect to={'/adminDashboard'}/>   
        )
    }
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
          <form name="form" onSubmit={this.handleSubmit}>
              <div className={'form-group'}>
                  <label htmlFor="email">Email</label>
                  <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange.bind(this)} />
                  { err && err.email ?
                   <div className="help-block">{err.email}</div> : ''
                   }    

              </div>
              <div className={'form-group'}>
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" value={password}  onChange={this.handleChange.bind(this)} />
                  {err && err.password ?
                   <div className="help-block">{err.password }</div> : '' 
                  }   
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary">Login</button>
                  <Link to="/register" className="btn btn-link">User Register</Link>
                  <Link to="/adminRegister" className="btn btn-link">Admin Register</Link>
              </div>
          </form>
      </div>
         )
  }
}

export default Login
