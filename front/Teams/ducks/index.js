'use strict'

import { combineReducers } from 'redux'
import HomePageReducer from './homePage'
import CreateTeamReducer from './createTeam'

const TeamsRootReducer = combineReducers({
  Home: HomePageReducer,
  Create: CreateTeamReducer
})

export default TeamsRootReducer
