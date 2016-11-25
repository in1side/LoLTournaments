'use strict'

import React from 'react'
import { render } from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'

import App from './App'

// Action Creators
import { setCreateTeamToDefaultState } from './Teams/ducks/create'
import { setHomePageToDefaultState } from './Teams/ducks/home'
import { setTeamInfoToDefaultState } from './Teams/ducks/info'

// Middleware
const clearViewStatesOnViewActivation = store => next => action => {
  const actionPaths = action.type.split('/')
  const actionName = actionPaths[actionPaths.length - 1]
  const actionSrc = actionPaths[actionPaths.length - 2]

  if (actionName === 'TOGGLE_VIEW') {
    switch (actionSrc) {
      case 'create':
        store.dispatch(setHomePageToDefaultState())
        store.dispatch(setTeamInfoToDefaultState())
        break
      case 'home':
        store.dispatch(setCreateTeamToDefaultState())
        store.dispatch(setTeamInfoToDefaultState())
        break
      case 'info':
        store.dispatch(setCreateTeamToDefaultState())
        store.dispatch(setHomePageToDefaultState())
        break
    }
  }
  return next(action)
}

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(clearViewStatesOnViewActivation))

const init = () => {
  const app = document.createElement('div')
  document.body.appendChild(app)

  render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>,
    app
  )
}

init()
