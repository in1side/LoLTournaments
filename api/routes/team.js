'use strict'

const db = require('../models')

module.exports = (app) => {
  // Return all teams with attributes id, name and members
  app.get('/team/getAll', (req, res, err) => {
    db.Team.findAll({ attributes: ['id', 'name', 'members'], raw: true })
    .then((teams) => {
      if (teams === null) return res.send({ message: 'No teams exist' })
      res.send(teams)
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke get all teams...' })
    })
  })

  // Create and return team with given name, members and tournamentId.
  // Fails if tournament doesn't exist or team name taken within same tournament
  app.post('/team/create', (req, res, err) => {
    const { name, members, tournamentId } = req.body

    // Check if tournament exists
    db.Tournament.findById(tournamentId)
    .then((tournament) => {
      if (tournament === null) return res.send({ message: 'Tournament doesn\'t exist.' })

      // Attempt team creation
      db.Team.findOrCreate({ where: { name, tournamentId }, defaults: { name, members, tournamentId } })
      .spread((team, isSuccessful) => {
        if (!isSuccessful) return res.send({ message: 'Team with that name already exists in this tournament.' })
        res.send({ team, message: 'Successfully created team!' })
      })
      .catch((error) => {
        console.log(error)
        res.send({ message: 'Something broke create team when trying to creating team...' })
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke create team when searching for tournament...' })
    })
  })

  // Delete team from tournament.
  // Fails if tournament doesn't exist or if team doesn't exist
  app.post('/team/delete', (req, res, err) => {
    const { teamId, tournamentId } = req.body

    // Check if tournament exists
    db.Tournament.findById(tournamentId)
    .then((tournament) => {
      if (tournament === null) return res.send({ message: 'Tournament doesn\'t exist.' })

      // Attemp to delete team
      db.Team.findById(teamId)
      .then((team) => {
        if (team === null) return res.send({ message: 'Team doesn\'t exist.' })
        team.destroy()
        res.send({ message: 'Team deletion successful!' })
      })
      .catch((error) => {
        console.log(error)
        res.send({ message: 'Something broke get delete team when trying to delete team...' })
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke get delete team when trying to find tournament...' })
    })
  })
}
