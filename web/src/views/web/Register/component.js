import React, { Component } from "react"
import { Redirect , Link} from 'react-router-dom'
import 'antd/dist/antd.css';
class Register extends Component {
   constructor(props) {
    super(props);
    this.state = {
      userName:'',
      password:'',
      err: {},
      email:''
    }
  }

  handleChange=(event) =>{
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit=(event)=> {
     event.preventDefault()
    const err = {}
    const {userName , password , email} = this.state
    const { registerUser } = this.props

    if (userName === '') {
      err.userName = 'Enter User Name'
    }
    
    if (password === '' ) {
      err.password = 'Enter  Valid Password.'
    }

    if (email === '' || email.trim() === '') {
      err.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      err.email = 'Invalid email';
    }

    this.setState({ err })
    
    if (!Object.keys(err).length) {
        const data = {
          name: userName,
          pass:password,
          role : 'User',
          mail: email.toLowerCase()
        }
       registerUser(data)
  }
}

  render() {
    const {phase  , loginStatus} = this.props
    const {userName , password , err , email} = this.state
   if(phase === "success" && loginStatus){
      return(
        <Redirect to={`/userDashboard`}/>   
        )
    }
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>User Register</h2>
        <form  name="form" onSubmit={this.handleSubmit}>
         <div className={'form-group'}>
            <label htmlFor="userName">Username</label>
            <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleChange.bind(this)} />
            { err && err.userName ?
             <div className="help-block">{err.userName}</div> : ''
             }    

        </div>
        <div className={'form-group'}>
            <label htmlFor="userName">Email</label>
            <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange.bind(this)} />
            { err && err.email ?
             <div className="help-block">{err.email}</div> : ''
             }    

        </div>
        <div className={'form-group'}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password}  onChange={this.handleChange.bind(this)} />
            {err && err.password ?
             <div className="help-block">{err.password}</div> : '' 
            }   
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Register</button>
            <Link to="/login" className="btn btn-link">Cancel</Link>
        </div>                     
        </form>
      </div>
     )
  }
}

export default Register
