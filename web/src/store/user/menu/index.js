import userReducer from "./duck/reducers"
import registerUserEpic from "./duck/epics"
import loginUserEpic from "./duck/epics"
import createTicketEpic from "./duck/epics"
import fetchTicketEpic from "./duck/epics"
import updateTicketEpic from "./duck/epics"
import deleteTicketEpic from "./duck/epics"
import fetchUsersEpic from "./duck/epics"
import fetchUserTicketsEpic from "./duck/epics"
import createTicketsOrderEpic from "./duck/epics"
import updateTicketOrderEpic from "./duck/epics"
export const userRegisterEpic = registerUserEpic
export const userLoginEpic = loginUserEpic
export const ticketCreateEpic = createTicketEpic
export const ticketFetchEpic = fetchTicketEpic
export const ticketUpdateEpic = updateTicketEpic
export const ticketDeleteEpic = deleteTicketEpic
export const usersFetchEpic = fetchUsersEpic
export const usersTicketsFetchEpic = fetchUserTicketsEpic
export const ticketsCreateOrderEpic = createTicketsOrderEpic
export const ticketUpdateOrderEpic = updateTicketOrderEpic
export default userReducer
