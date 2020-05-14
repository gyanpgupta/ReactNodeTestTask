/* eslint-disable default-case */
import { Record } from "immutable"
import { assign } from "lodash"
import * as type from "./action-types"
import { INIT, LOADING, SUCCESS, ERROR } from "../../../../utils/constants"
import _ from 'lodash'
const InitialStateInterface = {
  phase: INIT,
  error: null,
  data: [] ,
  loginMessage:'',
  loginStatus:false,
  // ticketData:[],
  tickets:[],
  users:[],
  userTickets:[],
  orderMessage:'',
  ticketsOrder:[]
}

class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    super(assign(desiredValues))
  }
}

export default function(state = new InitialState(), action = {}) {
  switch (action.type) {

    

    //user login action
    case type.USER_LOGIN: {
      return state
      .set("phase", LOADING)
      .set("error", null)
      .set('loginStatus',false)
      .set('loginMessage','')
    }
    case type.USER_LOGIN_SUCCESS: {
      const { payload } = action
      localStorage.setItem('token', _.get(payload,'data.user.uid',''));
      return state
        .set("phase", SUCCESS)
        .set("data", payload.data)
        .set("error", null)
        .set('loginStatus',payload.status)
        .set('loginMessage',payload.message)
    }
    case type.USER_LOGIN_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }


       //user register action
    case type.REGISTER_USER: {
      return state
      .set("phase", LOADING)
      .set("error", null)
      .set('loginStatus',false)
      .set('loginMessage','')
    }
    case type.REGISTER_USER_SUCCESS: {
      const { payload } = action
      localStorage.setItem('token',_.get(payload,'data.uid',''));
      return state
        .set("phase", SUCCESS)
        .set("data", payload.data)
        .set("error", null)
        .set('loginStatus',payload.status)
        .set('loginMessage',payload.message)
    }
    case type.REGISTER_USER_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }

    //create ticket
    case type.CREATE_TICKET: {
      return state
      .set("phase", LOADING)
      .set("error", null)
    }
    case type.CREATE_TICKET_SUCCESS: {
      //const { payload } = action
      return state
        .set("phase", SUCCESS)
        // .set("ticketData", payload.data)
        .set("error", null)
    }
    case type.CREATE_TICKET_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }


    //fetch ticket
    case type.FETCH_TICKET: {
      return state
      .set("phase", LOADING)
      .set("error", null)
    }
    case type.FETCH_TICKET_SUCCESS: {
      const { payload } = action
      return state
        .set("phase", SUCCESS)
        .set("tickets", payload.data)
        .set("ticketsOrder",payload.ticketsOrder)
        .set("error", null)
    }
    case type.FETCH_TICKET_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }

    //update ticket
    case type.UPDATE_TICKET: {
      return state
      .set("phase", LOADING)
      .set("error", null)
    }
    case type.UPDATE_TICKET_SUCCESS: {
      //const { payload } = action
      return state
        .set("phase", SUCCESS)
        // .set("tickets", payload.data)
        .set("error", null)
    }
    case type.UPDATE_TICKET_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }

    //delete ticket
    case type.DELETE_TICKET: {
      return state
      .set("phase", LOADING)
      .set("error", null)
    }
    case type.DELETE_TICKET_SUCCESS: {
      //const { payload } = action
      return state
        .set("phase", SUCCESS)
        // .set("tickets", payload.data)
        .set("error", null)
    }
    case type.DELETE_TICKET_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }

    //fetch ticket
    case type.FETCH_USER: {
      return state
      .set("phase", LOADING)
      .set("error", null)
    }
    case type.FETCH_USER_SUCCESS: {
      const { payload } = action
      return state
        .set("phase", SUCCESS)
        .set("users", payload.data)
        .set("error", null)
    }
    case type.FETCH_USER_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }

    //fetch user ticket
    case type.FETCH_USER_TICKETS: {
      return state
      .set("phase", LOADING)
      .set("error", null)
    }
    case type.FETCH_USER_TICKETS_SUCCESS: {
      const { payload } = action
      return state
        .set("phase", SUCCESS)
        .set("userTickets", payload.data)
        .set("error", null)
    }
    case type.FETCH_USER_TICKETS_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }

     //create ticket
    case type.POST_ORDER_REQUEST: {
      return state
      .set("phase", LOADING)
      .set("error", null)
    }
    case type.POST_ORDER_REQUEST_SUCCESS: {
      const { payload } = action
      return state
        .set("phase", SUCCESS)
        .set("error", null)
        .set("orderMessage",payload.message)
    }
    case type.POST_ORDER_REQUEST_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }



     //update ticket
    case type.UPDATE_TICKET_ORDER: {
      return state
      .set("phase", LOADING)
      .set("error", null)
    }
    case type.UPDATE_TICKET_ORDER_SUCCESS: {
      //const { payload } = action
      return state
        .set("phase", SUCCESS)
        // .set("tickets", payload.data)
        .set("error", null)
    }
    case type.UPDATE_TICKET_ORDER_ERROR: {
      return state.set("phase", ERROR).set("error", null)
    }
    
    case type.INIT_PHASE: {
      return state.set("orderMessage", '').set("phase", INIT)
    }
   
   
    default: {
      return state
    }
  }
}
