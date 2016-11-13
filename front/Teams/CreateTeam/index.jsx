'use strict'

import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import constants from '../../../constants'
import 'whatwg-fetch'

// Components
import CustomMultiSelect from '../../util/components/CustomMultiSelect'

export default class CreateTeam extends Component {
  constructor (props) {
    super(props)

    // Generate state for roles
    const initialRolesState = {}
    constants.ALLOWED_ROLES.forEach((role) => {
      initialRolesState[role] = false
    })

    // NOTE: Need Object.assign() or else points to same obj in memory
    this.state = {
      name: '',
      desiredRoles: Object.assign({}, initialRolesState),
      leaderUsername: '',
      leaderTeamRoles: Object.assign({}, initialRolesState),
      errorText: ''
    }
  }

  handleNameInput = (event) => {
    event.preventDefault()

    const result = {
      name: event.target.value,
      errorText: ''
    }

    if (result.name.length > constants.MAX_TEAM_NAME_LENGTH) {
      result.errorText = 'Team name must be less than or equal to 256 characters.'
    }
    this.setState(result)
  }

  handleDesiredRolesInputUsingButtonValue = (event, isInputChecked) => {
    event.preventDefault()

    const newDesiredRoles = this.state.desiredRoles
    const selectedRole = event.target.value

    newDesiredRoles[selectedRole] = !newDesiredRoles[selectedRole]

    this.setState({
      desiredRoles: newDesiredRoles
    })
  }

  handleLeaderTeamRolesInputUsingButtonValue = (event, isInputChecked) => {
    event.preventDefault()

    const newLeaderTeamRoles = this.state.leaderTeamRoles
    const selectedRole = event.target.value

    newLeaderTeamRoles[selectedRole] = !newLeaderTeamRoles[selectedRole]

    this.setState({
      leaderTeamRoles: newLeaderTeamRoles
    })
  }

  generateMultiSelectButtonConfigs = (buttonsState, clickHandler) => {
    return Object.keys(buttonsState).map((role) => {
      return { label: role, value: role, selected: buttonsState[role], onClick: clickHandler }
    })
  }

  postCreateTeam = () => {
    const { name, desiredRoles } = this.state

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
        leaderUserID: '261a3e3c-dd27-4fa3-bcda-4431138d47ae' // TODO: Get leader user id
      })
    })
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render () {
    const { desiredRoles, leaderTeamRoles } = this.state
    const desiredRolesButtonConfig = this.generateMultiSelectButtonConfigs(desiredRoles, this.handleDesiredRolesInputUsingButtonValue)
    const leaderTeamRolesButtonConfig = this.generateMultiSelectButtonConfigs(leaderTeamRoles, this.handleLeaderTeamRolesInputUsingButtonValue)

    return (
      <div className='CreateTeam'>
        <TextField
          hintText='My Awesome Team Name'
          floatingLabelText='Team Name'
          floatingLabelFixed
          errorText={this.state.errorText}
          onChange={this.handleNameInput}
        />
        <CustomMultiSelect
          title='Desired Roles'
          arrayOfButtonConfigObjects={desiredRolesButtonConfig}
        />
        <CustomMultiSelect
          title='My Main Roles'
          arrayOfButtonConfigObjects={leaderTeamRolesButtonConfig}
        />
        <RaisedButton primary label='Create Team' onClick={this.postCreateTeam} />
        <RaisedButton secondary label='Cancel' />
      </div>
    )
  }
}
