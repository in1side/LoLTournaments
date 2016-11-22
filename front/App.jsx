'use strict'

require('./styles.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'

// Containers
import TeamsHomePage from './Teams'

// Components
import Navigation from './Navigation'

// Actions
import { toggleViewCreateTeams } from './Teams/ducks'

export class App extends Component {
  render () {
    const menuActions = [
      {
        text: 'Create Team',
        handler: () => {
          this.props.toggleViewCreateTeams()
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
  toggleViewCreateTeams: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleViewCreateTeams: () => {
      dispatch(toggleViewCreateTeams())
    }
  }
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp
