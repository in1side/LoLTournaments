'use strict'

// actions
const LOGIN = 'app/Auth0/AuthService/LOGIN'
const LOGOUT = 'app/Auth0/AuthService/LOGOUT'


// Reducer
export default function LoginReducer (state = false, action) {
  switch (action.type) {
    case LOGIN:
      return true
    case LOGOUT:
      return false
    default:
      return state
  }
}

// Action Creators
export function setAsLoggedIn () {
  return { type: LOGIN }
}

export function setAsLoggedOut () {
  return { type: LOGOUT }
}
