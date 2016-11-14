'use strict'

import React, { Component } from 'react'
import 'whatwg-fetch'

// Components
import CustomTable from '../util/components/CustomTable'

export default class Teams extends Component {
  constructor (props) {
    super(props)

    this.state = {
      teams: []
    }

    this.getAllTeams()
  }

  getAllTeams = () => {
    fetch('http://localhost:3000/getAllTeams', {
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      const { teams } = result

      this.setState({ teams })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // TODO: Link team name and leader to respective info page
  render () {
    const { teams } = this.state

    return (
      <div className='Teams'>
        <h2>Testing Table</h2>
        <CustomTable
          givenColumnNames={['id', 'name', 'members', 'desiredRoles', 'leaderID']}
          arrayOfRowContentObjects={teams}
        />
      </div>
    )
  }
}
