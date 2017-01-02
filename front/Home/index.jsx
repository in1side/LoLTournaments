'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'

// Action Creators
import { saveTournaments, deleteTournaments } from './ducks'

// material-ui
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

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

      this.props.saveTournaments(tournaments)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount () {
    this.getAllTournaments()
  }

  createTournamentRows = () => {
    return this.props.tournaments.map((tournament) => {
      return (
        <TableRow
          key={`tournament${tournament.id}`}
          // TODO: Figure out why this doesn't work. Then make clicking go to tournament info page
          onClick={() => {
            console.log('hi')
          }}
        >
          <TableRowColumn key={`tournament${tournament.id}-name`}>{tournament.name}</TableRowColumn>
          <TableRowColumn key={`tournament${tournament.id}-date`}>{tournament.date}</TableRowColumn>
          <TableRowColumn key={`tournament${tournament.id}-registrationDeadline`}>{tournament.registrationDeadline}</TableRowColumn>
          <TableRowColumn key={`tournament${tournament.id}-totalPlayers`}>{tournament.totalPlayers}</TableRowColumn>
          <TableRowColumn key={`tournament${tournament.id}-server`}>{tournament.server}</TableRowColumn>
        </TableRow>
      )
    })
  }

  render () {
    return (
      <div className='Home'>
        <Table
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Registration Deadline (with Time Zone)</TableHeaderColumn>
              <TableHeaderColumn>Total Players</TableHeaderColumn>
              <TableHeaderColumn>Server</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {this.createTournamentRows()}
          </TableBody>
        </Table>
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
