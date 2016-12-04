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
import { setEditTeamToDefaultState } from './Teams/ducks/edit'

// Middleware
// NOTE: Always add new defaultstate setters and case when new views made
const clearViewStatesOnViewActivation = store => next => action => {
  const actionPaths = action.type.split('/')
  const actionName = actionPaths[actionPaths.length - 1]
  const actionSrc = actionPaths[actionPaths.length - 2]

  if (actionName === 'TOGGLE_VIEW') {
    switch (actionSrc) {
      case 'create':
        store.dispatch(setHomePageToDefaultState())
        store.dispatch(setTeamInfoToDefaultState())
        store.dispatch(setEditTeamToDefaultState())
        break
      case 'home':
        if (store.getState().Teams.Home.get('isActive')) return // Do nothing if toggling when already at Home page
        store.dispatch(setCreateTeamToDefaultState())
        store.dispatch(setTeamInfoToDefaultState())
        store.dispatch(setEditTeamToDefaultState())
        break
      case 'info':
        store.dispatch(setCreateTeamToDefaultState())
        store.dispatch(setHomePageToDefaultState())
        store.dispatch(setEditTeamToDefaultState())
        break
      case 'edit':
        store.dispatch(setCreateTeamToDefaultState())
        store.dispatch(setHomePageToDefaultState())
        store.dispatch(setTeamInfoToDefaultState())
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
