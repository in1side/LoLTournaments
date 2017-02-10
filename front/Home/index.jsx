'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'whatwg-fetch'

// Action Creators
import { saveTournaments, deleteTournaments, saveApplications, delApplications } from './ducks'

// material-ui
import {Card, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'
import Divider from 'material-ui/Divider'

// Helpers
import util from '../util'

export class Home extends Component {
  getAllTournaments = () => {
    fetch('http://localhost:3000/tournament/getAll', {
      method: 'GET',
      'headers': { 'Content-Type': 'application/json' }
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

  getAllContestantApplications = () => {
    const userId = util.getUserProfile().user_id
    fetch('http://localhost:3000/application/getAllForContestant', {
      method: 'POST',
      'headers': { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId
      })
    })
    .then(res => {
      return util.throwExceptionIfResponseStatusNotSuccess(res)
    })
    .then((result) => {
      const { applications } = result
      // Save received applications, or empty array if given undefined (i.e. none were found)
      applications !== undefined ? this.props.saveApplications(applications) : this.props.saveApplications([])
    })
    .catch((error) => {
      console.log(error)
    })
  }

  sendApplicationCreationRequest = (tournamentId) => {
    const profile = util.getUserProfile()
    const userId = profile.user_id
    const summonerName = profile.user_metadata.summonerName
    fetch('http://localhost:3000/application/create', {
      method: 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        userId,
        summonerName,
        tournamentId
      })
    })
    .then(res => {
      return util.throwExceptionIfResponseStatusNotSuccess(res)
    })
    .then((result) => {
      console.log(result.message)
      this.getAllContestantApplications()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  sendApplicationDeletionRequest = (applicationId) => {
    const profile = util.getUserProfile()
    const userId = profile.user_id
    fetch('http://localhost:3000/application/delete', {
      method: 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        userId,
        applicationId
      })
    })
    .then(res => {
      return util.throwExceptionIfResponseStatusNotSuccess(res)
    })
    .then((result) => {
      console.log(result.message)
      this.getAllContestantApplications()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentWillMount () {
    this.getAllTournaments()
  }

  componentWillReceiveProps (nextProps) {
    // If contestant just signed in, get their applications
    if (!this.props.isSignedIn && nextProps.isSignedIn && util.isUserTypeEqualTo('contestant')) {
      this.getAllContestantApplications()
    }
  }

  // Create Apply button that sends application create request with user's username, summonerName and tournamentId
  createApplyButtonIfContestant = (tournamentId) => {
    if (!util.isUserTypeEqualTo('contestant')) return null

    return (<RaisedButton
      label='Apply'
      primary
      onTouchTap={() => { this.sendApplicationCreationRequest(tournamentId) }}
    />)
  }

  showApplicationIsApprovedStatus = (isApproved) => {
    if (isApproved === null) return 'Pending'

    return isApproved ? 'Accepted' : 'Rejected'
  }

  showContestantApplications = () => {
    if (!this.props.isSignedIn || !util.isUserTypeEqualTo('contestant')) return null

    const applicationRows = this.props.applications.map((application) => {
      return (
        <TableRow
          key={`application${application}`}
          selectable={false}
        >
          <TableHeaderColumn key={`application${application.id}-tournamentName`}>{application.tournamentName}</TableHeaderColumn>
          <TableHeaderColumn key={`application${application.id}-tournamentDate`}>{util.modifyTimestampToClientTimezoneAndFormat(application.tournamentDate, 'h:mmA MMM DD, YYYY')}</TableHeaderColumn>
          <TableHeaderColumn key={`application${application.id}-status`}>{this.showApplicationIsApprovedStatus(application.isApproved)}</TableHeaderColumn>
          <TableHeaderColumn key={`application${application.id}-delete`}>
            <RaisedButton
              label='Delete'
              secondary
              onTouchTap={() => {
                this.sendApplicationDeletionRequest(application.id)
              }}
            />
          </TableHeaderColumn>
        </TableRow>
      )
    })
    return (
      <div className='my-applications'>
        <h2>My Applications</h2>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn key={'application-column-tournamentName'}>Tournament Name</TableHeaderColumn>
              {/* // TODO: format date */}
              <TableHeaderColumn key={'application-column-tournamentDate'}>Date</TableHeaderColumn>
              <TableHeaderColumn key={'application-column-status'}>Status</TableHeaderColumn>
              <TableHeaderColumn key={'application-column-Delete'}>Delete</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {applicationRows}
          </TableBody>
        </Table>
        <Divider />
      </div>
    )
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
    .catch((error) => {
      console.log(error)
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
            {this.createApplyButtonIfContestant(tournament.id)}
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
            {this.showContestantApplications()}
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
    applications: Home.get('applications'),
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
    },
    saveApplications: (applications) => {
      dispatch(saveApplications(applications))
    },
    delApplications: () => {
      dispatch(delApplications())
    }
  }
}

const connectedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default connectedHome
