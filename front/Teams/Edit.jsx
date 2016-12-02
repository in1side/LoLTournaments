'use strict'

import React, { Component } from 'react'
import CustomTable from '../shared_components/CustomTable'
import 'whatwg-fetch'
import { connect } from 'react-redux'
import CustomTabs from '../shared_components/CustomTabs'

// Action Creators
import { setTeams, selectTeam } from './ducks/edit'

// TODO: save everything to store now
export class EditTeam extends Component {
  componentDidMount () {
    // TODO: replace this with Auth0 id
    this.getTeamsOwnedByUser(1)
  }

  getTeamsOwnedByUser = (userID) => {
    fetch('http://localhost:3000/search/teamByLeaderID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        leaderID: userID
      })
    })
    .then((res) => {
      return res.json()
    })
    .then((result) => {
      this.props.setTeams(result.teams)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render () {
    const { teams } = this.props
    return (
      <div className='EditTeam'>
        <CustomTabs teams={teams} />
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
