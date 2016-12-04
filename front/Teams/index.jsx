'use strict'

import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'
import helpers from '../util/helpers'

// Components
import CustomTable from '../shared_components/CustomTable'
import CreateTeam from './Create'
import TeamInfo from './Info'
import EditTeam from './Edit'

// Action Creators
import { toggleViewHomePage, setTableColumns, setTeams } from './ducks/home'
import { toggleViewTeamInfo, setTeam } from './ducks/info'

export class TeamsHomePage extends Component {
  componentWillMount () {
    this.fetchTeams()
    this.props.toggleViewHomePage()
  }

  componentWillReceiveProps (nextProps) {
    // Only fetch teams when teams view is toggled on
    if (!this.props.isActive && nextProps.isActive) this.fetchTeams()
  }

  fetchTeams = () => {
    helpers.hitAPI('http://localhost:3000/getAllTeams', 'GET')
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

  // TODO: Link leader to respective info page
  render () {
    const { teams, tableColumns, isCreateTeamActive, isTeamInfoActive, isEditTeamActive, selectedTeam } = this.props

    if (isCreateTeamActive) {
      return (
        <div className='TeamsHomePage'>
          <CreateTeam />
        </div>
      )
    }

    if (isTeamInfoActive) {
      return (
        <div className='TeamsHomePage'>
          <TeamInfo team={selectedTeam} />
        </div>
      )
    }

    if (isEditTeamActive) {
      return (
        <div>
          <EditTeam />
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
            handleRowClick={(team) => {
              this.props.toggleViewTeamInfo(team)
            }}
          />
        </div>
      )
    }
  }
}

TeamsHomePage.propTypes = {
  isActive: React.PropTypes.bool,
  tableColumns: React.PropTypes.array,
  teams: React.PropTypes.array.isRequired,
  isCreateTeamActive: React.PropTypes.bool,
  isTeamInfoActive: React.PropTypes.bool,
  isEditTeamActive: React.PropTypes.bool,
  selectedTeam: React.PropTypes.object,
  // Hides annoying warnings about functions
  toggleViewHomePage: React.PropTypes.func,
  setTeams: React.PropTypes.func,
  setTableColumns: React.PropTypes.func,
  toggleViewTeamInfo: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  const { Home, Create, Info, Edit } = state.Teams

  return {
    isActive: Home.get('isActive'),
    tableColumns: Home.get('tableColumns'),
    teams: Home.get('teams'),
    isCreateTeamActive: Create.get('isActive'),
    isTeamInfoActive: Info.get('isActive'),
    isEditTeamActive: Edit.get('isActive'),
    selectedTeam: Info.get('team')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleViewHomePage: () => {
      dispatch(toggleViewHomePage())
    },
    setTableColumns: (columns) => {
      dispatch(setTableColumns(columns))
    },
    setTeams: (teams) => {
      dispatch(setTeams(teams))
    },
    toggleViewTeamInfo: (team) => {
      dispatch(setTeam(team))
      dispatch(toggleViewTeamInfo())
    }
  }
}

const connectedTeamsHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsHomePage)

export default connectedTeamsHomePage
