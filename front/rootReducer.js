'use strict'

// store {
//   isViewCreateTeam: {},
//   isViewAllTeams: {},
//   isViewTeamInfo: {}
// }

import { combineReducers } from 'redux'

// Reducers
import TeamsReducer from './Teams/ducks'
import NavigationReducer from './Navigation/ducks'

const rootReducer = combineReducers({
  Teams: TeamsReducer,
  isNavigationActive: NavigationReducer
})

export default rootReducer
