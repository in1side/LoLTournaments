'use strict'

const db = require('../models')

module.exports = (app) => {
  // Get all tournaments' id, name, date, registrationDeadline, totalPlayers, teams, server
  // and updatedAt timestamp ordered by updatedAt timestamp in descending order
  app.get('/tournament/getAll', (req, res, err) => {
    db.Tournament.findAll({ attributes: ['id', 'name', 'date', 'registrationDeadline', 'totalPlayers', 'teams', 'server', 'description'], order: [['updatedAt', 'DESC']], raw: true })
    .then((tournaments) => {
      if (tournaments.length === 0) return res.status(200).send({ message: 'No tournaments exist.' })

      res.status(200).send({ tournaments })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error: 'Something broke trying to get all tournaments...' })
    })
  })

  function getTournamentApplications (tournamentId) {
    return db.Application.findAll({ attributes: ['id', 'summonerName', 'userId', 'isApproved'], where: { tournamentId } })
    .then((applications) => {
      return applications
    })
  }

  // Get all tournaments' id, name, date, registrationDeadline, totalPlayers, teams, server
  // and updatedAt timestamp ordered by updatedAt timestamp in descending order
  app.post('/tournament/getAllFromHost', (req, res, err) => {
    const { hostId } = req.body

    db.Tournament.findAll({ where: { hostId }, attributes: ['id', 'name', 'date', 'registrationDeadline', 'totalPlayers', 'teams', 'server', 'description'], order: [['updatedAt', 'DESC']], raw: true })
    .then((tournaments) => {
      if (tournaments.length === 0) return res.status(200).send({ message: 'You aren\'t hosting any tournaments.' })

      const p1 = new Promise((resolve, reject) => {
        const getAllTournamentApplicationsPromises = tournaments.map((tournament) => {
          return getTournamentApplications(tournament.id)
        })

        Promise.all(getAllTournamentApplicationsPromises)
        .then((applications) => {
          const tournamentsWithApplications = tournaments.map((tournament, index) => {
            tournament.applications = applications[index]
            return tournament
          })

          resolve(tournamentsWithApplications)
        })
      })

      p1.then((result) => {
        res.status(200).send({ tournaments })
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error: 'Something broke trying to get all host\'s tournaments...' })
    })
  })

  // Create a tournament with the given name, hostId, date, registrationDeadline, server
  app.post('/tournament/create', (req, res, err) => {
    const { name, hostId, hostUsername, date, registrationDeadline, server, totalPlayers, description } = req.body

    // Create tournament if user is host
    db.Tournament.findOrCreate({where: { name, hostId }, defaults: { date, registrationDeadline, server, teams: [], totalPlayers, description, hostUsername }})
    .spread((tournament, isSuccessful) => {
      if (!isSuccessful) return res.status(400).send({ message: 'Failed to create tournament.' })
      res.status(201).send({ message: 'Successfully created tournament!' })
    })
  })

  // Delete tournament and all teams participating
  app.post('/tournament/delete', (req, res, err) => {
    const { tournamentId, hostId } = req.body

    db.Tournament.findOne({ where: { id: tournamentId, hostId } })
    .then((tournament) => {
      if (tournament === null) return res.status(200).send({ message: 'Tournament does not exist.' })
      tournament.destroy()
      // TODO: When teams actually implemented, Delete all teams in that tournament

      res.status(201).send({ message: 'Tournament was successfully deleted!' })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error: 'Something broke trying to delete tournament...' })
    })
  })

  // Add a team to tournament when given teamId
  app.post('/tournament/add/team', (req, res, err) => {
    const { tournamentId, teamId } = req.body
    // Check if team exists
    db.Team.findById(teamId)
    .then((team) => {
      if (team === null) return res.status(200).send({ message: 'Team doesn\'t exists.' })
      // If tournamnet exists, append team. Otherwise respond with error message
      return db.Tournament.findById(tournamentId)
      .then((tournament) => {
        if (tournament === null) return res.status(200).send({ message: 'Tournament doesn\'t exist.' })
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
          res.status(200).send({ tournament: result })
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send({ error: 'Something broke trying to search for tournament when adding team to tournament...' })
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error: 'Something broke trying to search for team when adding to tournament...' })
    })
  })
}
