import { connect } from 'react-redux'
import { registerUser } from "../../../store/user/menu/duck/actions"
//import { fetchAdmin } from "../../../store/admin/menu/duck/actions"

import Register from './component'

const RegisterContainer = connect(
  // Map state to props
  (state) => ({
  	user: state.user.menu.data,
  	phase:state.user.menu.phase,
    loginStatus:state.user.menu.loginStatus
  	// adminData:state.admin.menu.adminData
  }),
  // Map actions to props
  {
    registerUser,
    
    // fetchAdmin
  }
)(Register)

export default RegisterContainer


