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

// Middleware
const log = store => next => action => {
  // Check if toggle view action
  // Get default of action source (a.k.a view's default state)
  // Set to default
  console.log('Action:', action)
  console.log('Store:', store)
  return next(action)
}

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(log))

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
