import * as type from './action-types'


export const userLogin = data => (
{
  type: type.USER_LOGIN,
  payload: data
})

export const registerUser = data => (
{
  type: type.REGISTER_USER,
  payload: data
})

export const createTicket = data => (
{
  type: type.CREATE_TICKET,
  payload: data
})

export const fetchTicket = data => (
{
  type: type.FETCH_TICKET,
  payload: data
})

export const updateTicket = data => (
{
  type: type.UPDATE_TICKET,
  payload: data
})

export const deleteTicket = data => (
{
  type: type.DELETE_TICKET,
  payload: data
})

export const fetchUsers = data => (
{
  type: type.FETCH_USER,
  payload: data
})

export const fetchUserTickets = data => (
{
  type: type.FETCH_USER_TICKETS,
  payload: data
})

export const postOrderRequest = data => (
{
  type: type.POST_ORDER_REQUEST,
  payload: data
})

export const initPhase = data => (
{
  type: type.INIT_PHASE,
  payload: data
})

export const updateTicketOrder = data => (
{
  type: type.UPDATE_TICKET_ORDER,
  payload: data
})









