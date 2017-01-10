'use strict'

import { combineReducers } from 'redux'

// Reducers
import HomeReducer from './Home/ducks'
import HostReducer from './Host/ducks'
import SignInSignOutReducer from './SignInSignOut/ducks'

const rootReducer = combineReducers({
  Home: HomeReducer,
  Host: HostReducer,
  SignInSignOut: SignInSignOutReducer
})

export default rootReducer
