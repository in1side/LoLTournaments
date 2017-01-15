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

export class Host extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isCreatingNewTournament: false
    }
  }

  isUserHost = () => {
    const profile = localStorage.getItem('profile')
    if (profile === null) return

    const userType = JSON.parse(profile).user_metadata.userType
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
    } else if (this.isUserHost() && (this.props.isSignedIn)) {
      return (
        <div className='Host'>
          <RaisedButton
            label='Create Tournament'
            primary
            onTouchTap={() => {
              this.setState({ isCreatingNewTournament: true })
            }}
          />
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
