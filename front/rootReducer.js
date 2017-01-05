'use strict'

import { combineReducers } from 'redux'

// Reducers
import HomeReducer from './Home/ducks'
import HostReducer from './Host/ducks'

const rootReducer = combineReducers({
  Home: HomeReducer,
  Host: HostReducer
})

export default rootReducer
