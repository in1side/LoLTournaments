'use strict'

import React from 'react'
import { render } from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Reducer
import rootReducer from './rootReducer'

// Components
import App from './app'

// Styles
require('!style-loader!css-loader!sass-loader!./main.scss')

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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
