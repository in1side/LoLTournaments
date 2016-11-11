'use strict'

import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import constants from '../../../constants'

// Components
import CustomRadioSelection from '../../util/components/CustomRadioSelection'

export default class CreateTeam extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      desiredRoles: [],
      leaderUsername: '',
      leaderRoles: [],
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

  handleDesiredRolesInput = (event, value) => {
    event.preventDefault()
    this.setState({ desiredRoles: [value] })
  }

  handleLeaderRolesInput = (event, value) => {
    event.preventDefault()
    this.setState({ leaderRoles: [value] })
  }

  render () {
    // Create an object setting each role as its own key and value
    const roleOptions = {}
    for (let i = 0; i < constants.ALLOWED_ROLES.length; i++) {
      roleOptions[constants.ALLOWED_ROLES[i]] = constants.ALLOWED_ROLES[i]
    }

    return (
      <div className='CreateTeam'>
        <TextField
          hintText='My Awesome Team Name'
          floatingLabelText='Team Name'
          floatingLabelFixed
          errorText={this.state.errorText}
          onChange={this.handleNameInput}
        />
        <h2>Desired Roles</h2>
        <CustomRadioSelection
          objectOfOptions={roleOptions}
          selectionGroupName='desiredRoles'
          eventHandler={this.handleDesiredRolesInput}
        />
        <h2>My Main Roles</h2>
        <CustomRadioSelection
          objectOfOptions={roleOptions}
          selectionGroupName='leaderRoles'
          eventHandler={this.handleLeaderRolesInput}
        />
        <RaisedButton primary label='Create Team' />
        <RaisedButton secondary label='Cancel' />
      </div>
    )
  }
}
