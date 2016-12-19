'use strict'

const db = require('../models')

module.exports = (app) => {
  app.get('/get/allTournaments', (req, res, err) => {
    db.Tournament.findAll({ attributes: ['id', 'name', 'date', 'registrationDeadline', 'server', 'updatedAt'], raw: true })
    .then((tournaments) => {
      if (tournaments.length === 0) return res.send({ message: 'No tournaments exist.' })
      res.send({ tournaments })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke get all tournaments...' })
    })
  })

  app.post('/create/tournament', (req, res, err) => {
    const { name, host, date, registrationDeadline, server } = req.body

    db.Tournament.findOrCreate({where: { name, host }, defaults: { date, registrationDeadline, server }})
    .spread((tournament, isSuccessful) => {
      if (!isSuccessful) return res.send({ message: 'Failed to create tournament.' })
      res.send({ tournament, message: 'Successfully created tournament!' })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke create tournament...' })
    })
  })

  app.post('/delete/tournament', (req, res, err) => {
    const { tournamentId, hostId } = req.body
    db.Tournament.findOne({ where: { id: tournamentId, host: hostId } })
    .then((tournament) => {
      if (tournament === null) return res.send({ message: 'Tournament does not exist.' })
      tournament.destroy()
      res.send({ message: 'Tournament was successfully deleted!' })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something broke delete tournament...' })
    })
  })
}
