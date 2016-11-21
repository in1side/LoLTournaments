'use strict'

// store {
//   isViewCreateTeam: bool,
//   isViewAllTeams: bool,
//   isViewTeamInfo: bool
// }

import { combineReducers } from 'redux'

// Reducers
import CreateTeamReducer from './Teams/ducks'

const rootReducer = combineReducers({
  CreateTeamReducer
})

export default rootReducer
