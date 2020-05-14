import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"


import userReducer, {   userRegisterEpic } from "./menu"


export const registerUserEpic = combineEpics(
  userRegisterEpic 
)

const userRegisterReducer = combineReducers({
 
  menu: userReducer
 
})

export default userRegisterReducer
