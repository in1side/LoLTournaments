'use strict'

require('./styles.scss')

import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

// Containers
import Teams from './Teams'

// Test
import CreateTeam from './Teams/CreateTeam'
import TeamInfo from './Teams/TeamInfo'

export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <h2>HEADER HERE!!!</h2>
        <RaisedButton label='Create Team' onClick={() => console.log('Hello World!')} primary />
        <Teams />
        <CreateTeam />
        <TeamInfo teamInfoObject={{ name: 'Test', members: ['me', 'you'], lol: 'jhafjkdahlf' }} />
      </div>
    )
  }
}
