'use strict'

import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'

// Views
import Home from './Home'
import Host from './Host'

// material-ui
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

const CLIENT_ID = 'IqpajO4vcyVQPeEKHtMS9J6K0Ky1MQHl'
const DOMAIN = 'bsoropia.auth0.com'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // TODO: if accessToken is valid, login
      isLoggedIn: false
    }

    // Auth0 lock config and initialization
    this.lock = new Auth0Lock(CLIENT_ID, DOMAIN, {
      auth: {
        redirectUrl: 'http://localhost:8080',
        responseType: 'token',
        params: { scope: 'openid' }
      },
      additionalSignUpFields: [{
        type: 'select',
        name: 'userType',
        placeholder: 'Contestant or host?',
        options: [
          {value: 'contestant', label: 'Contestant'},
          {value: 'host', label: 'Host'}
        ]
      }],
      loginAfterSignUp: true,
      rememberLastLogin: true
    })

    this.lock.on('authenticated', (authResult) => {
      // Use the token in authResult to getProfile() and save it to localStorage
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log(error)
          return
        }
        localStorage.setItem('accessToken', authResult.accessToken)
        localStorage.setItem('idToken', authResult.idToken)
        localStorage.setItem('profile', JSON.stringify(profile))
        this.setState({ isLoggedIn: true })
        console.log(profile)
      })
    })
  }

  toggleLoginLogoutButton = () => {
    return this.state.isLoggedIn
      ? <FlatButton label='Logout' onTouchTap={() => {
        this.setState({ isLoggedIn: false })
        localStorage.removeItem('idToken')
        localStorage.removeItem('profile')
        // TODO: Redirect back to home
        this.lock.logout({ returnTo: 'http://localhost:8080' })
      }} />
      : <FlatButton label='Login' onTouchTap={() => {
        this.lock.show()
      }} />
  }

  render () {
    return (
      <div className='App'>
        <AppBar
          title='LoL Tournaments'
          showMenuIconButton={false}
          iconElementRight={this.toggleLoginLogoutButton()}
        />
        <Home />
        <Host />
      </div>
    )
  }
}
