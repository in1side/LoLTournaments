'use strict'

import { combineReducers } from 'redux'

// Reducers
import HomePageReducer from './home'
import CreateTeamReducer from './create'
import TeamInfoReducer from './info'
import EditTeamReducer from './edit'

const TeamsRootReducer = combineReducers({
  Home: HomePageReducer,
  Create: CreateTeamReducer,
  Info: TeamInfoReducer,
  Edit: EditTeamReducer
})

export default TeamsRootReducer
