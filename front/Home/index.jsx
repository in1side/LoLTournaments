'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'

// Action Creators
import { saveTournaments, deleteTournaments } from './ducks'

// material-ui
import {Card, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

// Helpers
import util from '../util'

export class Home extends Component {
  getAllTournaments = () => {
    fetch('http://localhost:3000/tournament/getAll', {
      method: 'GET',
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return util.throwExceptionIfResponseStatusNotSuccess(res)
    })
    .then((result) => {
      const { tournaments } = result

      if (tournaments !== undefined) {
        // Format all dates to machine time
        const tournamentsModifiedToClientTimezone = tournaments.map((tournament) => {
          tournament['date'] = util.modifyTimestampToClientTimezoneAndFormat(tournament['date'], 'h:mmA MMM DD, YYYY')
          tournament['registrationDeadline'] = util.modifyTimestampToClientTimezoneAndFormat(tournament['registrationDeadline'], 'h:mmA MMM DD, YYYY')

          return tournament
        })

        this.props.saveTournaments(tournamentsModifiedToClientTimezone)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentWillMount () {
    this.getAllTournaments()
  }

  showApplyButtonIfContestant = () => {
    if (!util.isUserTypeEqualTo('contestant')) return null

    return (<RaisedButton
      label='Apply'
      primary
      onTouchTap={() => { console.log('hi') }}
    />)
  }

// TODO: Send application, needs summoner name
  applyToTournament = () => {
    fetch('http://localhost:3000/applications/create', {
      method: 'POST',
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return util.throwExceptionIfResponseStatusNotSuccess(res)
    })
  }

  createTournamentCards = () => {
    if (this.props.tournaments === undefined) return

    return this.props.tournaments.map((tournament) => {
      return (
        <Card
          style={{ margin: '20px' }}
          key={`tournament${tournament.id}`}
        >
          <CardTitle title={tournament.name} subtitle={`Server: ${tournament.server}`} />
          <CardText>
            <p><b>Date:&#32;</b>{tournament.date}</p>
            <p><b>Registration Deadline:&#32;</b>{tournament.registrationDeadline}</p>
            <p><b>Total Players:&#32;</b>{tournament.totalPlayers}</p>
            <p>{tournament.description}</p>
            {this.showApplyButton()}
          </CardText>
        </Card>
      )
    })
  }

  render () {
    // Only render all tournaments if not a host
    if (this.props.isSignedIn && util.isUserTypeEqualTo('host')) {
      return null
    } else {
      return (
        <div className='Home'>
          <div style={{ margin: '40px' }}>
            {this.createTournamentCards()}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { Home, SignInSignOut } = state
  return {
    tournaments: Home.get('tournaments'),
    isSignedIn: SignInSignOut.get('isSignedIn')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveTournaments: (tournaments) => {
      dispatch(saveTournaments(tournaments))
    },
    deleteTournaments: () => {
      dispatch(deleteTournaments())
    }
  }
}

const connectedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default connectedHome
