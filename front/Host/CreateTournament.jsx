'use strict'

import React, { Component } from 'react'

// material-ui
import RaisedButton from 'material-ui/RaisedButton'

export default class CreateTournament extends Component {
  render () {
    return (
      <div className='CreateTournament'>
        <RaisedButton
          label='Cancel'
          secondary
          onTouchTap={this.props.handleClose}
        />
        <h1>HII</h1>
      </div>
    )
  }
}
