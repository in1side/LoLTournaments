'use strict'

import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'

// Components
import CustomTable from '../shared_components/CustomTable'
import CreateTeam from './CreateTeam'

// Actions
import { setTableColumns, setTeams, deleteTeams, deleteTableColumns } from './ducks/homePage'
import { toggleView } from './ducks/createTeam'

export class TeamsHomePage extends Component {
  componentWillMount () {
    this.getAllTeams()
  }

  componentWillUnmount () {
    this.props.clearState()
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

      this.props.setTableColumns(this.generateColumnNames(teams))
      this.props.setTeams(teams)
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
    const { teams, tableColumns, isCreateTeamActive, toggleViewCreateTeams } = this.props

    if (isCreateTeamActive) {
      return (
        <div className='TeamsHomePage'>
          <CreateTeam toggleView={toggleViewCreateTeams} />
        </div>
      )
    }
    if ((teams.length === 0) && (tableColumns.length === 0)) {
      return (
        <div className='TeamsHomePage'>
          <h2>All Teams</h2>
          <h2>No Teams Exist</h2>
        </div>
      )
    } else {
      return (
        <div className='TeamsHomePage'>
          <h2>All Teams</h2>
          <CustomTable
            givenColumnNames={tableColumns}
            rowContents={teams}
          />
        </div>
      )
    }
  }
}

TeamsHomePage.propTypes = {
  tableColumns: React.PropTypes.array,
  teams: React.PropTypes.array.isRequired,
  isCreateTeamActive: React.PropTypes.bool,
  // Hides annoying warnings about functions
  setTeams: React.PropTypes.func,
  setTableColumns: React.PropTypes.func,
  clearState: React.PropTypes.func,
  toggleViewCreateTeams: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  const { Home, Create } = state.Teams

  return {
    tableColumns: Home.get('tableColumns'),
    teams: Home.get('teams'),
    isCreateTeamActive: Create.get('isActive')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTableColumns: (columns) => {
      dispatch(setTableColumns(columns))
    },
    setTeams: (teams) => {
      dispatch(setTeams(teams))
    },
    clearState: () => {
      dispatch(deleteTableColumns())
      dispatch(deleteTeams())
    },
    toggleViewCreateTeams: () => {
      dispatch(toggleView())
    }
  }
}

const connectedTeamsHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsHomePage)

export default connectedTeamsHomePage
