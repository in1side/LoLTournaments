'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'
import moment from 'moment'

// Action Creators
import { saveTournaments, deleteTournaments } from './ducks'

// material-ui
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

export class Home extends Component {
  componentDidMount () {
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
      // TODO: Make times human readable
      this.props.saveTournaments(tournaments)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render () {
    return (
      <div className='Home'>
        {/* Table Goes Here */}
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
