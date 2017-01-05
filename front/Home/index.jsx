'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'

// Action Creators
import { saveTournaments, deleteTournaments } from './ducks'

// material-ui
import {Card, CardTitle, CardText} from 'material-ui/Card'

export class Home extends Component {
  getAllTournaments = () => {
    fetch('http://localhost:3000/tournament/getAll', {
      method: 'GET',
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return res.json()
    })
    .then((result) => {
      const { tournaments } = result

      if (tournaments !== undefined) {
        this.props.saveTournaments(tournaments)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentWillMount () {
    this.getAllTournaments()
  }

  createTournamentCards = () => {
    if (this.props.tournaments === undefined) return

    return this.props.tournaments.map((tournament) => {
      return (
        <Card
          style={{ margin: '20px' }}
          onTouchTap={() => {
            // TODO: Go to tournament page
            console.log('Card clicked', tournament.id)
          }}
          key={`tournament${tournament.id}`}
        >
          <CardTitle title={tournament.name} subtitle={`Server: ${tournament.server}`} />
          <CardText>
            <p><b>Date:&#32;</b>{tournament.date}</p>
            <p><b>Registration Deadline:&#32;</b>{tournament.registrationDeadline}</p>
            <p><b>Total Players:&#32;</b>{tournament.totalPlayers}</p>
            <p>{tournament.description}</p>
          </CardText>
        </Card>
      )
    })
  }

  render () {
    return (
      <div className='Home'>
        <div style={{ margin: '40px' }}>
          {this.createTournamentCards()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { Home } = state
  return {
    tournaments: Home.get('tournaments')
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
