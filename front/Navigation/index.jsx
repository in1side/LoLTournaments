'use strict'

import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'

// Action Creators
import { toggleNavigation } from './ducks'

export class Navigation extends Component {
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
  toggleNavigation: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.isNavigationActive
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleNavigation: () => {
      dispatch(toggleNavigation())
    }
  }
}

const connectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default connectedNavigation
