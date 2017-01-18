'use strict'

const db = require('../models')
// const moment = require('moment')
const request = require('request')

module.exports = (app) => {
  // Get all tournaments' id, name, date, registrationDeadline, totalPlayers, teams, server
  // and updatedAt timestamp ordered by updatedAt timestamp in descending order
  app.get('/tournament/getAll', (req, res, err) => {
    db.Tournament.findAll({ attributes: ['id', 'name', 'date', 'registrationDeadline', 'totalPlayers', 'teams', 'server', 'description'], order: [['updatedAt', 'DESC']], raw: true })
    .then((tournaments) => {
      if (tournaments.length === 0) return res.send({ message: 'No tournaments exist.' })

      // // Make date and registrationDeadline human readable
      // const tournamentsWithHumanReadableTimes = tournaments.map((tournament) => {
      //   tournament.date = moment(tournament.date, 'YYYY-MM-DD HH:mm:ss.SSSZ').format('h:mmA ([UTC]Z) MMM DD, YYYY ')
      //   tournament.registrationDeadline = moment(tournament.registrationDeadline, 'YYYY MMM DD HH:mm:ss.SSSZ').format('h:mmA ([UTC]Z) MMM DD, YYYY ')
      //
      //   return tournament
      // })

      res.send({ tournaments })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke get all tournaments...' })
    })
  })

  // Get all tournaments' id, name, date, registrationDeadline, totalPlayers, teams, server
  // and updatedAt timestamp ordered by updatedAt timestamp in descending order
  app.post('/tournament/getAllFromHost', (req, res, err) => {
    const { hostId } = req.body
    db.Tournament.findAll({ where: { hostId }, attributes: ['id', 'name', 'date', 'registrationDeadline', 'totalPlayers', 'teams', 'server', 'description'], order: [['updatedAt', 'DESC']], raw: true })
    .then((tournaments) => {
      if (tournaments.length === 0) return res.send({ message: 'You aren\'t hosting any tournaments.' })

      // Make date and registrationDeadline human readable
      // const tournamentsWithHumanReadableTimes = tournaments.map((tournament) => {
      //   tournament.date = moment(tournament.date, 'YYYY-MM-DD HH:mm:ss.SSSZ').format('h:mmA ([UTC]Z) MMM DD, YYYY ')
      //   tournament.registrationDeadline = moment(tournament.registrationDeadline, 'YYYY MMM DD HH:mm:ss.SSSZ').format('h:mmA ([UTC]Z) MMM DD, YYYY ')
      //
      //   return tournament
      // })

      res.send({ tournaments })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke get all host\'s tournaments...' })
    })
  })

  // Create a tournament with the given name, hostId, date, registrationDeadline, server
  app.post('/tournament/create', (req, res, err) => {
    const { accessToken, name, hostId, hostUsername, date, registrationDeadline, server, totalPlayers, description } = req.body

    // Check if hostId is an actual valid host
    const options = {
      url: 'https://bsoropia.auth0.com/userinfo',
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }

    request(options, (error, response, body) => {
      // Evaluate received user profile if valid accessToken
      if ((error === null) && (response.statusCode === 200)) {
        if (JSON.parse(body).user_metadata.userType !== 'host') return res.send({ message: 'Only hosts can create tournaments.' })

        // Create tournament if user is host
        db.Tournament.findOrCreate({where: { name, hostId }, defaults: { date, registrationDeadline, server, teams: [], totalPlayers, description, hostUsername }})
        .spread((tournament, isSuccessful) => {
          if (!isSuccessful) return res.send({ message: 'Failed to create tournament.' })
          res.send({ tournament, message: 'Successfully created tournament!' })
        })
        .catch((error) => {
          console.log('Find or create error:', error)
          res.send({ message: 'Something broke create tournament...' })
        })
      } else { // Error or non 200 statusCode received
        console.log('else', error, body)
        res.send({ message: `Can't create tournament. Reason: ${body}` })
      }
    })
  })

  // Delete tournament and all teams participating
  app.post('/tournament/delete', (req, res, err) => {
    const { tournamentId, hostId } = req.body
    db.Tournament.findOne({ where: { id: tournamentId, hostId } })
    .then((tournament) => {
      if (tournament === null) return res.send({ message: 'Tournament does not exist.' })
      tournament.destroy()
      // TODO: Delete all teams in that tournament

      res.send({ message: 'Tournament was successfully deleted!' })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke delete tournament...' })
    })
  })

  // Add a team to tournament when given teamId
  app.post('/tournament/add/team', (req, res, err) => {
    const { tournamentId, teamId } = req.body
    // Check if team exists
    db.Team.findById(teamId)
    .then((team) => {
      if (team === null) return res.send({ message: 'Team doesn\'t exists.' })
      // If tournamnet exists, append team. Otherwise respond with error message
      return db.Tournament.findById(tournamentId)
      .then((tournament) => {
        if (tournament === null) return res.send({ message: 'Tournament doesn\'t exist.' })
        const updatedTeams = []
        // Copy old teams
        tournament.get('teams').forEach((id) => {
          updatedTeams.push(id)
        })
        // Save updated tournament's teams
        updatedTeams.push(teamId)
        tournament.set('teams', updatedTeams)
        return tournament.save()
        .then((result) => {
          // TODO: Handle when result is a Sequelize.ValidationError
          res.send({ tournament: result })
        })
      })
      .catch((error) => {
        console.log(error)
        res.send({ message: 'Something broke searching for tournament when adding team to tournament.' })
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke searching for team when adding to tournament.' })
    })
  })
}
