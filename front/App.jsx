'use strict'

import React, { Component } from 'react'

// Views
import Home from './Home'
import Host from './Host'

// Auth0
import SignInSignOut from './SignInSignOut'

// material-ui
import AppBar from 'material-ui/AppBar'


export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <AppBar
          title='LoL Tournaments'
          showMenuIconButton={false}
          iconElementRight={<SignInSignOut />}
        />
        <Home />
        <Host />
      </div>
    )
  }
}
