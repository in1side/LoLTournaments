'use strict'

import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import constants from '../../constants'
import Auth0Lock from 'auth0-lock'

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
        placeholder: 'your username'
      }]
    })
    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);
      this.props.setAsLoggedIn()
      localStorage.setItem('id_token', authResult.idToken)
      this.lock.getUserInfo(authResult.idToken, (profile) => {
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
