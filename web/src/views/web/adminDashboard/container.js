import { connect } from 'react-redux'
import {updateTicketOrder , createTicket , fetchTicket , deleteTicket , updateTicket ,fetchUsers , initPhase} from "../../../store/user/menu/duck/actions"
import adminDeshboard from './component'

const AdminDeshboardContainer = connect(
  // Map state to props
  (state) => ({
  	tickets: state.user.menu.tickets,
    users:state.user.menu.users,
    ticketsOrder:state.user.menu.ticketsOrder,
    phase:state.user.menu.phase
  }),
  // Map actions to props
  {
    createTicket,
    fetchTicket,
    deleteTicket,
    updateTicket,
    fetchUsers,
    updateTicketOrder,
    initPhase
  }
)(adminDeshboard)

export default AdminDeshboardContainer


