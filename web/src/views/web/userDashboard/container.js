import { connect } from 'react-redux'
import {fetchUserTickets , updateTicket , postOrderRequest , initPhase} from "../../../store/user/menu/duck/actions"
import userDeshboard from './component'

const UserDeshboardContainer = connect(
  // Map state to props
  (state) => ({
    userTickets:state.user.menu.userTickets,
    orderMessage:state.user.menu.orderMessage,
    phase:state.user.menu.phase,
  }),
  // Map actions to props
  {
    fetchUserTickets,
    updateTicket,
    postOrderRequest,
    initPhase
  }
)(userDeshboard)

export default UserDeshboardContainer


