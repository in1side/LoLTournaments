'use strict'

import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'

// Action Creators
import { saveHostTournaments } from './ducks'

export class Host extends Component {
  isUserHost = () => {
    if (localStorage.getItem('profile') === null) return

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

  render () {
    if (this.isUserHost()) {
      return (
        <div className='Host'>
          <h1>HOST VIEW</h1>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => {
  const { Host } = state
  return {
    tournaments: Host.tournaments
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
