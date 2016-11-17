'use strict'

import React, { Component } from 'react'
import 'whatwg-fetch'

// Components
import CustomTable from '../util/components/CustomTable'

export default class Teams extends Component {
  constructor (props) {
    super(props)

    this.state = {
      allTeamsInfo: []
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
      const { allTeamsInfo } = result

      this.setState({ allTeamsInfo })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // TODO: Link team name and leader to respective info page
  render () {
    const { allTeamsInfo } = this.state
    console.log(allTeamsInfo);
    return (
      <div className='Teams'>
        <h2>Testing Table</h2>
        <CustomTable
          givenColumnNames={['id', 'name', 'members', 'desiredRoles', 'leaderID']}
          rowContents={allTeamsInfo}
        />
      </div>
    )
  }
}
