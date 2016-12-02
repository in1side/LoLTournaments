'use strict'

import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import constants from '../../constants'
import Auth0Lock from 'auth0-lock'
import 'whatwg-fetch'

// Action Creators
import { toggleNavigation } from './ducks'
import { setAsLoggedIn, setAsLoggedOut } from '../Auth0/ducks'

export class Navigation extends Component {
  constructor (props) {
    super(props)
    this.lock = new Auth0Lock(constants.CLIENT_ID, constants.DOMAIN, {
      auth: {
        redirectUrl: 'http://localhost:8080/',
        responseType: 'token'
      },
      additionalSignUpFields: [{
        name: 'Username',
        placeholder: 'Username'
      }, {
        name: 'summonerName',
        placeholder: 'Summoner Name',
        validate: (summonerName) => {
          return {
            valid: summonerName.length <= constants.SUMMONER_MAX_LEN,
            hint: `Summoner name must be ${constants.SUMMONER_MAX_LEN} characters or less`
          }
        }
      }]
    })

    this.lock.on('authenticated', (authResult) => {
      this.props.setAsLoggedIn()
      localStorage.setItem('access_token', authResult.accessToken)
      localStorage.setItem('id_token', authResult.idToken)

      fetch('https://bsoropia.auth0.com/userinfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then((res) => res.json())
      .then((profile) => {
        console.log(profile)
        localStorage.setItem('profile', profile)
      })
    })
  }

  componentDidMount () {
    if (localStorage.getItem('id_token') !== null) this.props.setAsLoggedIn()
  }

  render () {
    const { title, actions, toggleNavigation, isOpen } = this.props

    // Generate menu item
    const menuItems = actions.map((action, index) => {
      return <MenuItem
        key={`menu-item${index}`}
        primaryText={action.text}
        onTouchTap={() => {
          action.handler()
          toggleNavigation() // Always close nav on click
        }}
      />
    })

    return (
      <div className='Navigation'>
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={toggleNavigation}
          iconElementRight={<FlatButton label={this.props.isLoggedIn ? 'Logout' : 'Login'} />}
          onRightIconButtonTouchTap={() => {
            if (localStorage.getItem('id_token') === null) {
              this.lock.show()
            } else {
              this.props.setAsLoggedOut()
              localStorage.removeItem('id_token')
            }
          }}
        />
        <Drawer
          open={isOpen}
          docked={false}
          onRequestChange={toggleNavigation}
          >
          {menuItems}
        </Drawer>
      </div>
    )
  }
}

Navigation.propTypes = {
  title: React.PropTypes.string.isRequired,
  actions: React.PropTypes.arrayOf(React.PropTypes.object),
  isOpen: React.PropTypes.bool,
  toggleNavigation: React.PropTypes.func,
  isLoggedIn: React.PropTypes.bool,
  setAsLoggedIn: React.PropTypes.func,
  setAsLoggedOut: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.isNavigationActive,
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleNavigation: () => {
      dispatch(toggleNavigation())
    },
    setAsLoggedIn: () => {
      dispatch(setAsLoggedIn())
    },
    setAsLoggedOut: () => {
      dispatch(setAsLoggedOut())
    }
  }
}

const connectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default connectedNavigation
