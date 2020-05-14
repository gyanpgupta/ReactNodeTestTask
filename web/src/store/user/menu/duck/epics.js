//eslint-disable-next-line
import Rx from 'rxjs/Rx';
import { Observable } from "rxjs"
import { mergeMap } from "rxjs/operators"
import { combineEpics, ofType } from "redux-observable"

import * as api from "./api"
import * as type from "./action-types"



const loginUserEpic = action$ =>
action$.pipe(
  ofType(type.USER_LOGIN),
  mergeMap(action => {
    return Observable.fromPromise(api.loginUser(action.payload))
      .flatMap(payload => [
      {
        type: type.USER_LOGIN_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.USER_LOGIN_ERROR,
          payload: { error }
        })
      )
  })
)

const registerUserEpic = action$ =>
action$.pipe(
  ofType(type.REGISTER_USER),
  mergeMap(action => {
    return Observable.fromPromise(api.registerUser(action.payload))
      .flatMap(payload => [
      {
        type: type.REGISTER_USER_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.REGISTER_USER_ERROR,
          payload: { error }
        })
      )
  })
)

const createTicketEpic = action$ =>
action$.pipe(
  ofType(type.CREATE_TICKET),
  mergeMap(action => {
    return Observable.fromPromise(api.createTicket(action.payload))
      .flatMap(payload => [
      {
        type: type.CREATE_TICKET_SUCCESS,
        payload
      },
      {
        type: type.FETCH_TICKET
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.CREATE_TICKET_ERROR,
          payload: { error }
        })
      )
  })
)

const fetchTicketEpic = action$ =>
action$.pipe(
  ofType(type.FETCH_TICKET),
  mergeMap(action => {
    return Observable.fromPromise(api.fetchTicket(action.payload))
      .flatMap(payload => [
      {
        type: type.FETCH_TICKET_SUCCESS,
        payload
      },
      ])
      .catch(error =>
        Observable.of({
          type: type.FETCH_TICKET_ERROR,
          payload: { error }
        })
      )
  })
)

const updateTicketEpic = action$ =>
action$.pipe(
  ofType(type.UPDATE_TICKET),
  mergeMap(action => {
    return Observable.fromPromise(api.updateTicket(action.payload))
      .flatMap(payload => [
      {
        type: type.UPDATE_TICKET_SUCCESS,
        payload
      },
      {
        type: type.FETCH_TICKET
      },
      {
       type: type.FETCH_USER_TICKETS
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.UPDATE_TICKET_ERROR,
          payload: { error }
        })
      )
  })
)

const deleteTicketEpic = action$ =>
action$.pipe(
  ofType(type.DELETE_TICKET),
  mergeMap(action => {
    return Observable.fromPromise(api.deleteTicket(action.payload))
      .flatMap(payload => [
      {
        type: type.DELETE_TICKET_SUCCESS,
        payload
      },
      {
        type: type.FETCH_TICKET
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.DELETE_TICKET_ERROR,
          payload: { error }
        })
      )
  })
)

const fetchUsersEpic = action$ =>
action$.pipe(
  ofType(type.FETCH_USER),
  mergeMap(action => {
    return Observable.fromPromise(api.fetchUsers(action.payload))
      .flatMap(payload => [
      {
        type: type.FETCH_USER_SUCCESS,
        payload
      },
      ])
      .catch(error =>
        Observable.of({
          type: type.FETCH_USER_ERROR,
          payload: { error }
        })
      )
  })
)

const fetchUserTicketsEpic = action$ =>
action$.pipe(
  ofType(type.FETCH_USER_TICKETS),
  mergeMap(action => {
    return Observable.fromPromise(api.fetchUserTickets(action.payload))
      .flatMap(payload => [
      {
        type: type.FETCH_USER_TICKETS_SUCCESS,
        payload
      },
      ])
      .catch(error =>
        Observable.of({
          type: type.FETCH_USER_TICKETS_ERROR,
          payload: { error }
        })
      )
  })
)

const createTicketsOrderEpic = action$ =>
action$.pipe(
  ofType(type.POST_ORDER_REQUEST),
  mergeMap(action => {
    return Observable.fromPromise(api.createTicketsOrder(action.payload))
      .flatMap(payload => [
      {
        type: type.POST_ORDER_REQUEST_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.POST_ORDER_REQUEST_ERROR,
          payload: { error }
        })
      )
  })
)

const updateTicketOrderEpic = action$ =>
action$.pipe(
  ofType(type.UPDATE_TICKET_ORDER),
  mergeMap(action => {
    return Observable.fromPromise(api.updateTicketOrder(action.payload))
      .flatMap(payload => [
      {
        type: type.UPDATE_TICKET_ORDER_SUCCESS,
        payload
      }
      ])
      .catch(error =>
        Observable.of({
          type: type.UPDATE_TICKET_ORDER_ERROR,
          payload: { error }
        })
      )
  })
)


export default combineEpics(
  registerUserEpic , 
  loginUserEpic , 
  createTicketEpic,
  fetchTicketEpic,
  updateTicketEpic,
  deleteTicketEpic,
  fetchUsersEpic,
  fetchUserTicketsEpic,
  createTicketsOrderEpic,
  updateTicketOrderEpic
  )
