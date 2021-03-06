'use strict'

import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'

// Action Creators
import { signIn, signOut } from './ducks'

// material-ui
import FlatButton from 'material-ui/FlatButton'

const CLIENT_ID = 'IqpajO4vcyVQPeEKHtMS9J6K0Ky1MQHl'
const DOMAIN = 'bsoropia.auth0.com'

export class SignInSignOut extends Component {
  constructor (props) {
    super(props)

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
      }, {
        name: 'summonerName',
        placeholder: 'Summoner Name',
        validator: function (summonerName) {
          return {
            valid: (summonerName.length <= 16) && /^\S*$/.test(summonerName),
            hint: 'Must have 16 or less chars containing no spaces'
          }
        }
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

        this.props.signIn()
      })
    })
  }

  toggleLoginLogoutButton = () => {
    return this.props.isSignedIn
      ? <FlatButton
        style={{ color: 'rgb(255, 255, 255)' }}
        label='Sign Out'
        onTouchTap={() => {
          this.props.signOut()

          localStorage.removeItem('idToken')
          localStorage.removeItem('profile')
          localStorage.removeItem('accessToken')

          this.lock.logout({ returnTo: 'http://localhost:8080' })
        }}
      />
      : <FlatButton
        style={{ color: 'rgb(255, 255, 255)' }}
        label='Sign In'
        onTouchTap={() => {
          this.lock.show()
        }}
      />
  }

  signInIfValidIdToken = () => {
    const idToken = localStorage.getItem('idToken')

    if (idToken !== null) {
      this.lock.getProfile(idToken, (error, profile) => {
        if (error) throw error

        localStorage.setItem('idToken', idToken)
        localStorage.setItem('profile', JSON.stringify(profile))

        this.props.signIn()
      })
    }
  }

  componentDidMount () {
    this.signInIfValidIdToken()
  }

  render () {
    return (
      <div className='SignInSignOut' style={{ 'marginTop': '5px' }}>
        {this.toggleLoginLogoutButton()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { SignInSignOut } = state
  return {
    isSignedIn: SignInSignOut.get('isSignedIn')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => {
      dispatch(signIn())
    },
    signOut: () => {
      dispatch(signOut())
    }
  }
}

const connectedSignInSignOut = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInSignOut)

export default connectedSignInSignOut
