import { connect } from 'react-redux'
import { userLogin } from "../../../store/user/menu/duck/actions"
import Login from './component'

const LoginContainer = connect(
  // Map state to props
  (state) => ({
  	data: state.user.menu.data,
  	phase: state.user.menu.phase,
    loginStatus: state.user.menu.loginStatus,
    loginMessage: state.user.menu.loginMessage,
  }),
  // Map actions to props
  {
    userLogin
  }
)(Login)

export default LoginContainer


