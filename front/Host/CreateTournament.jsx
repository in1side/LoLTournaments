'use strict'

import React, { Component } from 'react'
import moment from 'moment'
import 'whatwg-fetch'

// material-ui
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

// Constants
const DATE_SUBTRING_END_IDX = 10

export default class CreateTournament extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: null,
      server: null,
      totalPlayers: null,
      startDate: null,
      startTime: null,
      registrationDeadlineDate: null,
      registrationDeadlineTime: null,
      description: null
    }
  }

  handleNameInput = (event, newName) => { this.setState({ name: newName }) }

  handleServerSeletion = (event, index, value) => { this.setState({ server: value }) }

  handleTotalPlayersInput = (event, newTotalPlayers) => { this.setState({ totalPlayers: parseInt(newTotalPlayers) }) }

  handleStartDateSelection = (event, newStartDate) => { this.setState({ startDate: moment.utc(newStartDate).format() }) }

  handleStartTimeSelection = (event, newStartTime) => { this.setState({ startTime: moment.utc(newStartTime).format() }) }

  handleRegistrationDeadlineDateSelection = (event, newRegistrationDeadlineDate) => { this.setState({ registrationDeadlineDate: moment.utc(newRegistrationDeadlineDate).format() }) }

  handleRegistrationDeadlineTimeSelection = (event, newRegistrationDeadlineTime) => { this.setState({ registrationDeadlineTime: moment.utc(newRegistrationDeadlineTime).format() }) }

  handleDescriptionInput = (event, newDescription) => { this.setState({ description: newDescription }) }

  isFormComplete = () => {
    for (let key in this.state) {
      if (this.state[key] === null) return false
    }

    return true
  }

  submitForm = () => {
    const {
      name,
      server,
      totalPlayers,
      startDate,
      startTime,
      registrationDeadlineDate,
      registrationDeadlineTime,
      description
    } = this.state

    // TODO: Prompt to complete forms
    if (!this.isFormComplete()) {
      console.log('Complete the form please.')
      return
    }

    const hostProfile = JSON.parse(localStorage.getItem('profile'))

    // Form start timestamp from startDate and time by cutting out date and time, respectively, then appending
    const date = startDate.substring(0, DATE_SUBTRING_END_IDX) + startTime.substring(DATE_SUBTRING_END_IDX)
    // Form registrationDeadline timestamp from registrationDeadlineDate and time  by cutting out date and time, respectively, then appending
    const registrationDeadline = registrationDeadlineDate.substring(0, DATE_SUBTRING_END_IDX) + registrationDeadlineTime.substring(DATE_SUBTRING_END_IDX)

    fetch('http://localhost:3000/tournament/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessToken: localStorage.getItem('accessToken'),
        name,
        hostId: hostProfile.user_id,
        hostUsername: hostProfile.username,
        date,
        registrationDeadline,
        server,
        totalPlayers,
        description
      })
    })
    .then((res) => { return res.json() })
    .then((result) => {
      // TODO: Flash message of success
      this.props.handleClose()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render () {
    return (
      <div className='CreateTournament'>
        <h1>Create New Tournament</h1>
        <RaisedButton
          label='Cancel'
          secondary
          onTouchTap={this.props.handleClose}
        />
        <RaisedButton
          primary
          label='Submit'
          onTouchTap={this.submitForm}
        />
        <div>
          <TextField
            id='nameField'
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
            id='totalPlayersField'
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
            floatingLabelText='Start Time'
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
            floatingLabelText='Registration Deadline Time'
            format='ampm'
            onChange={this.handleRegistrationDeadlineTimeSelection}
          />
        </div>
        <TextField
          floatingLabelText='Description'
          multiLine
          onChange={this.handleDescriptionInput}
          rows={3}
          style={{ width: '90vw' }}
        />
      </div>
    )
  }
}
