'use strict'

import { combineReducers } from 'redux'

// Reducers
import HomePageReducer from './home'
import CreateTeamReducer from './create'
import TeamInfoReducer from './info'

const TeamsRootReducer = combineReducers({
  Home: HomePageReducer,
  Create: CreateTeamReducer,
  Info: TeamInfoReducer
})

export default TeamsRootReducer
