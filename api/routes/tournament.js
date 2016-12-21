'use strict'

const db = require('../models')

module.exports = (app) => {
  // Get all tournaments' id, name, date, registrationDeadline, totalPlayers, teams, server and updatedAt timestamp
  app.get('/tournament/getAll', (req, res, err) => {
    db.Tournament.findAll({ attributes: ['id', 'name', 'date', 'registrationDeadline', 'totalPlayers', 'teams', 'server', 'updatedAt'], raw: true })
    .then((tournaments) => {
      if (tournaments.length === 0) return res.send({ message: 'No tournaments exist.' })
      res.send({ tournaments })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke get all tournaments...' })
    })
  })

  // Create a tournament with the given name, hostId, date, registrationDeadline, server
  app.post('/tournament/create', (req, res, err) => {
    const { name, hostId, date, registrationDeadline, server } = req.body

    db.Tournament.findOrCreate({where: { name, hostId }, defaults: { date, registrationDeadline, server, teams: [] }})
    .spread((tournament, isSuccessful) => {
      if (!isSuccessful) return res.send({ message: 'Failed to create tournament.' })
      res.send({ tournament, message: 'Successfully created tournament!' })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke create tournament...' })
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
