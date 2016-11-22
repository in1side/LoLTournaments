'use strict'

import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import 'whatwg-fetch'
import { connect } from 'react-redux'

// Components
import CustomMultiSelect from '../shared_components/CustomMultiSelect'

// Action Creators
import { setName, toggleDesiredRole, setErrorMessage, toggleView, resetDesiredRoles, deleteErrorMessage, deleteName } from './ducks/createTeam'
import { appendToTeam } from './ducks/homePage'

export class CreateTeam extends Component {
  createTeam = () => {
    const { name, desiredRoles } = this.props

    const selectedRoles = []
    Object.keys(desiredRoles).forEach((role) => {
      if (desiredRoles[role]) selectedRoles.push(role)
    })

    fetch('http://localhost:3000/create/team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        teamName: name,
        desiredRoles: selectedRoles,
        leaderID: 1 // TODO: Get leader user id
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      const { appendToTeam, toggleViewCreateTeam, resetForm } = this.props
      appendToTeam(result)
      toggleViewCreateTeam()
      resetForm()
    })
    .catch((error) => {
      this.props.setErrorMessage(error)
    })
  }

  generateMultiSelectButtonConfigs = (buttons, clickHandler) => {
    return Object.keys(buttons).map((role) => {
      return { label: role, value: role, selected: buttons[role], onClick: () => clickHandler(role) }
    })
  }

  handleNameInput = (event) => {
    event.preventDefault()
    this.props.setName(event.target.value)
  }

  render () {
    const { desiredRoles, errorMessage, toggleDesiredRole, toggleViewCreateTeam } = this.props
    const desiredRolesButtonConfig = this.generateMultiSelectButtonConfigs(desiredRoles, toggleDesiredRole)

    return (
      <div className='CreateTeam'>
        <TextField
          hintText='My Awesome Team Name'
          floatingLabelText='Team Name'
          floatingLabelFixed
          errorText={errorMessage}
          onChange={this.handleNameInput}
        />
        <CustomMultiSelect
          title='Desired Roles'
          buttonConfigs={desiredRolesButtonConfig}
        />
        <RaisedButton primary label='Create Team' onClick={this.createTeam} />
        <RaisedButton secondary label='Cancel' onClick={toggleViewCreateTeam} />
      </div>
    )
  }
}

CreateTeam.propTypes = {
  name: React.PropTypes.string,
  desiredRoles: React.PropTypes.objectOf(React.PropTypes.bool),
  errorMessage: React.PropTypes.string,
  setName: React.PropTypes.func,
  toggleDesiredRole: React.PropTypes.func,
  setErrorMessage: React.PropTypes.func,
  toggleViewCreateTeam: React.PropTypes.func,
  appendToTeam: React.PropTypes.func,
  resetForm: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  const { name, desiredRoles, errorMessage } = state.Teams.Create.toObject()

  return {
    name: name,
    desiredRoles: desiredRoles.toObject(),
    errorMessage: errorMessage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setName: (name) => {
      dispatch(setName(name))
    },
    toggleDesiredRole: (role) => {
      dispatch(toggleDesiredRole(role))
    },
    setErrorMessage: (message) => {
      dispatch(setErrorMessage(message))
    },
    toggleViewCreateTeam: () => {
      dispatch(toggleView())
    },
    appendToTeam: (team) => {
      dispatch(appendToTeam(team))
    },
    resetForm: () => {
      dispatch(deleteName())
      dispatch(deleteErrorMessage())
      dispatch(resetDesiredRoles())
    }
  }
}

const connectedCreateTeam = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTeam)

export default connectedCreateTeam
