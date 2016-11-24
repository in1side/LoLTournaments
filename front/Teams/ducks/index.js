'use strict'

import { combineReducers } from 'redux'

// Reducers
import HomePageReducer from './homePage'
import CreateTeamReducer from './createTeam'
import TeamInfoReducer from './teamInfo'

const TeamsRootReducer = combineReducers({
  Home: HomePageReducer,
  Create: CreateTeamReducer,
  Info: TeamInfoReducer
})

export default TeamsRootReducer
