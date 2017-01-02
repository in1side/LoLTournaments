'use strict'

import { combineReducers } from 'redux'

// Reducers
import HomeReducer from './Home/ducks'

const rootReducer = combineReducers({
  Home: HomeReducer
})

export default rootReducer
