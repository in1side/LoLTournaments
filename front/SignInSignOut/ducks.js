'use strict'

import Immutable from 'immutable'

// Actions
const SIGN_IN = 'app/SignInSignOut/index/SIGN_IN'
const SIGN_OUT = 'app/SignInSignOut/index/SIGN_OUT'

// Reducer
const initialState = Immutable.Map({
  isSignedIn: false
})
export default function SignInSignOutReducer (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return state.set('isSignedIn', true)
    case SIGN_OUT:
      return state.set('isSignedIn', false)
    default:
      return state
  }
}

// Action Creators
export function signIn () {
  return { type: SIGN_IN }
}

export function signOut () {
  return { type: SIGN_OUT }
}
