'use strict'

import React, { Component } from 'react'
import 'whatwg-fetch'

// Components
import CustomTable from '../util/components/CustomTable'

export default class Teams extends Component {
  constructor (props) {
    super(props)

    this.state = {
      columns: [],
      teams: []
    }
  }

  componentWillMount () {
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

      // NOTE: Use this maybe
      // const formattedTeams = teams.map((team) => {
      //   team.temp = this.extractArrayContentsAsString(team.members)
      //   team.roles = this.extractArrayContentsAsString(team.desiredRoles)
      //
      //   return team
      // })

      this.setState({ teams: teams, columns: this.generateColumnNames(teams) })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  extractArrayContentsAsString = (array) => {
    let contents = ''
    array.forEach((item, index) => {
      index === 0 ? contents = item : contents += `, ${item}`
    })

    return contents
  }

  generateColumnNames = (teams) => {
    const FIRST_TEAM = 0

    return teams.length === 0 ? [] : Object.keys(teams[FIRST_TEAM]).map((attribute) => attribute)
  }

  // TODO: Link team name and leader to respective info page
  render () {
    const { teams, columns } = this.state
    if ((teams.length === 0) && (columns.length === 0)) {
      return (
        <div className='Teams'>
          <h2>All Teams</h2>
          <h2>No Teams Exist</h2>
        </div>
      )
    } else {
      return (
        <div className='Teams'>
          <h2>All Teams</h2>
          <CustomTable
            givenColumnNames={columns}
            rowContents={teams}
          />
        </div>
      )
    }
  }
}
