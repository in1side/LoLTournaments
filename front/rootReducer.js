'use strict'

import { combineReducers } from 'redux'

// Root Reducers
import TeamsRootReducer from './Teams/ducks'
import NavigationReducer from './Navigation/ducks'

const rootReducer = combineReducers({
  Teams: TeamsRootReducer,
  isNavigationActive: NavigationReducer
})

export default rootReducer
