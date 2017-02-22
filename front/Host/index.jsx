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
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

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

  requestSetApplicationStatus = (applicationId, newStatus) => {
    fetch('http://localhost:3000/application/setIsApproved', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        applicationId,
        newStatus
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
    if ((localStorage.getItem('profile') !== null) && (util.isUserTypeEqualTo('host'))) {
      this.getHostTournaments()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // Update host's teams every time they come back from creating tournaments
    if (this.isDoneCreatingNewTournament(prevState)) {
      this.getHostTournaments()
    } else if (!prevProps.isSignedIn && this.props.isSignedIn) { // Get tournaments after signing in
      this.getHostTournaments()
    }
  }

  isDoneCreatingNewTournament = (prevState) => {
    return prevState.isCreatingNewTournament && !this.state.isCreatingNewTournament
  }

  displayApplicationStatusOrControls = (applicationId, isApproved) => {
    if (isApproved === null) {
      return (
        <div>
          <RaisedButton label='ACCEPT' primary onTouchTap={() => { this.requestSetApplicationStatus(applicationId, true) }} />
          <RaisedButton label='REJECT' secondary onTouchTap={() => { this.requestSetApplicationStatus(applicationId, false) }} />
        </div>
      )
    }
    return isApproved ? 'Accepted' : 'Rejected'
  }
  // Display applications and status controls in a table
  createTournamentApplicationsTable = (applications) => {
    let applicationRows

    if (applications.length === 0) { // No applications
      applicationRows = (
        <TableRow>
          <TableRowColumn>There are no applications!</TableRowColumn>
        </TableRow>
      )
    } else { // Generate rows for applications
      applicationRows = applications.map((application) => {
        return (
          <TableRow key={`application${application.id}-row`}>
            <TableRowColumn key={`application${application.id}-summonerName`}>{application.summonerName}</TableRowColumn>
            <TableRowColumn key={`application${application.id}-status`}>{this.displayApplicationStatusOrControls(application.id, application.isApproved)}</TableRowColumn>
          </TableRow>
        )
      })
    }

    return (
      <div className='Applications'>
        <h2>Applications</h2>
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Summoner Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {applicationRows}
          </TableBody>
        </Table>
      </div>
    )
  }

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
            {this.createTournamentApplicationsTable(tournament.applications)}
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
