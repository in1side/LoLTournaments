'use strict'

import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'

// Action Creators
import { saveHostTournaments } from './ducks'

// material-ui
import { Tabs, Tab } from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton'

export class Host extends Component {
  isUserHost = () => {
    console.log('is profile here?');
    if (localStorage.getItem('profile') === null) return

    console.log('is host?', userType === 'host');
    const userType = JSON.parse(localStorage.getItem('profile')).user_metadata.userType
    return userType === 'host'
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
        this.props.saveHostTournaments(tournaments)
      }
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

  createTournamentTabs = () => {
    if (this.props.tournaments === undefined) return

    return this.props.tournaments.map((tournament) => {
      return (
        <Tab
          label={tournament.name}
          key={`my-tournament${tournament.id}`}
        >
          <p><b>Date:&#32;</b>{tournament.date}</p>
          <p><b>Registration Deadline:&#32;</b>{tournament.registrationDeadline}</p>
          <p><b>Total Players:&#32;</b>{tournament.totalPlayers}</p>
          <p>{tournament.description}</p>
        </Tab>
      )
    })
  }

  render () {
    if (this.isUserHost()) {
      return (
        <div className='Host'>
          <RaisedButton label='Create Tournament' primary />
          <Tabs>
            {this.createTournamentTabs()}
          </Tabs>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => {
  const { Host } = state
  return {
    tournaments: Host.get('tournaments')
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