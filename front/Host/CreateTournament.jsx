'use strict'

import React, { Component } from 'react'
import moment from 'moment'

// material-ui
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class CreateTournament extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      server: null,
      totalPlayers: null,
      startDate: null,
      startTime: null,
      registrationDeadline: null,
      registrationDeadlineTime: null,
      description: ''
    }
  }

  handleNameInput = (event, newName) => { this.setState({ name: newName }) }

  handleServerSeletion = (event, index, value) => {
    this.setState({ server: value })
  }

  handleTotalPlayersInput = (event, newTotalPlayers) => { this.setState({ totalPlayers: parseInt(newTotalPlayers) }) }

  handleStartDateSelection = (event, newStartDate) => { this.setState({ startDate: newStartDate }) }

  handleStartTimeSelection = (event, newStartTime) => { this.setState({ startTime: newStartTime }) }

  handleRegistrationDeadlineDateSelection = (event, newRegistrationDeadline) => { this.setState({ registrationDeadline: newRegistrationDeadline }) }

  handleRegistrationDeadlineTimeSelection = (event, newRegistrationDeadlineTime) => { this.setState({ registrationDeadlineTime: newRegistrationDeadlineTime }) }

  handleDescriptionInput = (event, newDescription) => { this.setState({ description: newDescription }) }

  render () {
    return (
      <div className='CreateTournament'>
        <RaisedButton
          label='Cancel'
          secondary
          onTouchTap={this.props.handleClose}
        />
        <h1>Create New Tournament</h1>
        <div>
          <TextField
            floatingLabelText='Name'
            onChange={this.handleNameInput}
          />
          <SelectField
            floatingLabelText='Server'
            value={this.state.server}
            onChange={this.handleServerSeletion}
          >
            <MenuItem value='BR' primaryText='BR' />
            <MenuItem value='EUNE' primaryText='EUNE' />
            <MenuItem value='EUW' primaryText='EUW' />
            <MenuItem value='JP' primaryText='JP' />
            <MenuItem value='KOR' primaryText='KOR' />
            <MenuItem value='LAN' primaryText='LAN' />
            <MenuItem value='LAS' primaryText='LAS' />
            <MenuItem value='NA' primaryText='NA' />
            <MenuItem value='OCE' primaryText='OCE' />
            <MenuItem value='RU' primaryText='RU' />
            <MenuItem value='SEA' primaryText='SEA' />
            <MenuItem value='TR' primaryText='TR' />
          </SelectField>
          <TextField
            floatingLabelText='Total Players'
            onChange={this.handleTotalPlayersInput}
          />
        </div>
        <div>
          <DatePicker
            autoOk
            floatingLabelText='Start Date'
            onChange={this.handleStartDateSelection}
          />
          <TimePicker
            id='startTime'
            format='ampm'
            onChange={this.handleStartTimeSelection}
          />
        </div>
        <div>
          <DatePicker
            autoOk
            floatingLabelText='Registration Deadline'
            onChange={this.handleRegistrationDeadlineDateSelection}
          />
          <TimePicker
            id='registrationDeadlineTime'
            format='ampm'
            onChange={this.handleRegistrationDeadlineTimeSelection}
          />
        </div>
        <div>
          <TextField
            hintText='Description'
            onChange={this.handleDescriptionInput}
          />
        </div>
      </div>
    )
  }
}
