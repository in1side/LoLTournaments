'use strict'

import React, { Component } from 'react'

// Views
import Home from './Home'

// material-ui
import AppBar from 'material-ui/AppBar'

export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <AppBar
          title='LoL Tournaments'
        />
        <Home />
      </div>
    )
  }
}
