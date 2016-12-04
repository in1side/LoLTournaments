'use strict'

import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'
import CustomTabs from '../shared_components/CustomTabs'
import helpers from '../util/helpers'

// Action Creators
import { setTeams, selectTeam } from './ducks/edit'

// TODO: save everything to store now
export class EditTeam extends Component {
  componentDidMount () {
    // TODO: replace this with Auth0 id
    this.getTeamsOwnedByUser(1)
  }

  getTeamsOwnedByUser = (userID) => {
    helpers.hitAPI('http://localhost:3000/search/teamByLeaderID',
      'POST',
      {},
      JSON.stringify({
        leaderID: userID
      })
    )
    .then((res) => {
      return res.json()
    })
    .then((result) => {
      const { teams } = result
      // TODO: Save each team's name and members
      const basicTeamDetails = teams.map((team) => {
        return { name: team.name, desc: team.desc, members: team.members }
      })
      this.props.setTeams(basicTeamDetails)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render () {
    const { teams } = this.props
    return (
      <div className='EditTeam'>
        <CustomTabs contents={teams} />
      </div>
    )
  }
}

EditTeam.propTypes = {
  teams: React.PropTypes.arrayOf(React.PropTypes.object),
  selectedTeam: React.PropTypes.object,
  setTeams: React.PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  const { Edit } = state.Teams
  return {
    teams: Edit.get('teams').toArray(),
    selectedTeam: Edit.get('selectedTeam').toObject()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTeams: (teams) => {
      dispatch(setTeams(teams))
    },
    selectTeam: (team) => {
      dispatch(selectTeam(team))
    }
  }
}

const connectedEditTeam = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTeam)

export default connectedEditTeam
