'use strict'

import React, { Component } from 'react'

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

  handleServerSeletion = (event, index, value) => {
    this.setState({ server: value })
  }

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
          />
        </div>
        <div>
          <DatePicker
            autoOk
            floatingLabelText='Start Date'
          />
          <TimePicker
            id='startTime'
            format='ampm'
          />
        </div>
        <div>
          <DatePicker
            autoOk
            floatingLabelText='Registration Deadline'
          />
          <TimePicker
            id='registrationDeadlineTime'
            format='ampm'
          />
        </div>
        <div>
          <TextField
            hintText='Description'
          />
        </div>
      </div>
    )
  }
}
