'use strict'

require('./styles.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'

// Containers
import TeamsHomePage from './Teams'

// Components
import Navigation from './Navigation'

// Actions
import { toggleView as toggleCreateTeam } from './Teams/ducks/create'
import { toggleView as toggleEditTeam } from './Teams/ducks/edit'

export class App extends Component {
  render () {
    const menuActions = [
      {
        text: 'Create Team',
        handler: () => {
          this.props.toggleViewCreateTeam()
        }
      },
      {
        text: 'Edit My Teams',
        handler: () => {
          // TODO: toggle view here
          this.props.toggleViewEditTeam()
        }
      }
    ]

    return (
      <div className='App'>
        <Navigation title='LoL Teams' actions={menuActions} />
        <TeamsHomePage />
      </div>
    )
  }
}

App.propTypes = {
  Teams: React.PropTypes.object.isRequired,
  toggleViewCreateTeam: React.PropTypes.func,
  toggleViewEditTeam: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleViewCreateTeam: () => {
      dispatch(toggleCreateTeam())
    },
    toggleViewEditTeam: () => {
      dispatch(toggleEditTeam())
    }
  }
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp
