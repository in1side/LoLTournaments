'use strict'

import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'

// Components
import CreateTournament from './CreateTournament'

// Action Creators
import { saveHostTournaments } from './ducks'

// material-ui
import { Tabs, Tab } from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton'

// Helpers
import util from '../util'

export class Host extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isCreatingNewTournament: false
    }
  }

  getHostTournaments = () => {
    fetch('http://localhost:3000/tournament/getAllFromHost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hostId: JSON.parse(localStorage.getItem('profile')).user_id
      })
    })
    .then((res) => {
      return res.json()
    })
    .then((results) => {
      const { tournaments } = results
      if (tournaments !== undefined) {
        // Format all dates to client timezone
        const tournamentsModifiedToClientTimezone = tournaments.map((tournament) => {
          tournament['date'] = util.modifyTimestampToClientTimezoneAndFormat(tournament['date'], 'h:mmA MMM DD, YYYY')
          tournament['registrationDeadline'] = util.modifyTimestampToClientTimezoneAndFormat(tournament['registrationDeadline'], 'h:mmA MMM DD, YYYY')

          return tournament
        })

        this.props.saveHostTournaments(tournamentsModifiedToClientTimezone)
      } else { // Clear tournaments when host doesn't have tournaments in the DB
        // TODO: Flash message informing host doesn't have any tournaments
        console.log(results)
        this.props.saveHostTournaments([])
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  requestTournamentDeletionGivenIdAndHost = (tournamentId) => {
    fetch('http://localhost:3000/tournament/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        tournamentId,
        hostId: JSON.parse(localStorage.getItem('profile')).user_id
      })
    })
    .then(res => {
      return util.throwExceptionIfResponseStatusNotSuccess(res)
    })
    .then((result) => {
      // TODO: Flash message about success
      console.log(result.message)
      // TODO: Refetch updated tournaments
      this.getHostTournaments()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount () {
    if (localStorage.getItem('profile') !== null) {
      this.getHostTournaments()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // Update host's teams every time they come back from creating tournaments
    if (this.isDoneCreatingNewTournament(prevState)) this.getHostTournaments()
  }

  isDoneCreatingNewTournament = (prevState) => prevState.isCreatingNewTournament && !this.state.isCreatingNewTournament

  createTournamentTabs = () => {
    if (this.props.tournaments.length === 0) return

    const tournamentTabs = this.props.tournaments.map((tournament) => {
      return (
        <Tab
          label={tournament.name}
          key={`my-tournament${tournament.id}`}
        >
          <div style={{ margin: '20px' }}>
            <RaisedButton
              label='DELETE'
              secondary
              onTouchTap={() => { this.requestTournamentDeletionGivenIdAndHost(tournament.id) }}
            />
            <p><b>Date:&#32;</b>{tournament.date}</p>
            <p><b>Registration Deadline:&#32;</b>{tournament.registrationDeadline}</p>
            <p><b>Total Players:&#32;</b>{tournament.totalPlayers}</p>
            <p>{tournament.description}</p>
          </div>
        </Tab>
      )
    })

    return (<Tabs>{tournamentTabs}</Tabs>)
  }

  render () {
    if (this.state.isCreatingNewTournament) {
      return (
        <div className='Host'>
          <CreateTournament
            handleClose={() => {
              this.setState({ isCreatingNewTournament: false })
            }}
          />
        </div>
      )
    } else if (util.isUserTypeEqualTo('host') && (this.props.isSignedIn)) {
      return (
        <div className='Host'>
          <RaisedButton
            label='Create Tournament'
            primary
            onTouchTap={() => {
              this.setState({ isCreatingNewTournament: true })
            }}
            style={{ margin: '20px' }}
          />
          {this.createTournamentTabs()}
        </div>
      )
    } else { return null }
  }
}

const mapStateToProps = (state) => {
  const { Host, SignInSignOut } = state
  return {
    tournaments: Host.get('tournaments'),
    isSignedIn: SignInSignOut.get('isSignedIn')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveHostTournaments: (tournaments) => {
      dispatch(saveHostTournaments(tournaments))
    }
  }
}

const connectedHost = connect(
  mapStateToProps,
  mapDispatchToProps
)(Host)

export default connectedHost
