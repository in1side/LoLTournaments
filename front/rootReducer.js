'use strict'

import { combineReducers } from 'redux'

// Root Reducers
import TeamsRootReducer from './Teams/ducks'
import NavigationReducer from './Navigation/ducks'
import LoginReducer from './Auth0/ducks'

const rootReducer = combineReducers({
  Teams: TeamsRootReducer,
  isNavigationActive: NavigationReducer,
  isLoggedIn: LoginReducer
})

export default rootReducer
