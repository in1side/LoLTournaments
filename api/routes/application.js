'use strict'

const db = require('../models')

module.exports = (app) => {
  // Get all applications to a tournament
  app.post('/applications/getAll', (req, res, err) => {
    const { tournamentId } = req.body

    db.Application.findAll({ attributes: ['id', 'summonerName', 'status'], where: { tournamentId } })
    .then((applications) => {
      if (applications === null) return res.send({ message: 'No applications exist for this tournament.' })
      res.send({ applications })
    })
  })

  // Creates an application to a specified, existing tournament
  app.post('/applications/create', (req, res, err) => {
    const { tournamentId, applicantId, summonerName } = req.body

    // Check if tournament even exists
    db.Tournament.findById(tournamentId)
    .then((tournament) => {
      if (tournament === null) return res.send({ message: 'The given tournament doesn\'t exist.' })
      db.Application.findOrCreate({ where: { tournamentId, applicantId }, defaults: { summonerName, status: false } })
      .spread((application, isSuccessful) => {
        if (!isSuccessful) return res.send({ message: 'You\'ve already made an application to this tournament' })
        res.send({ application })
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something went wrong when creating an application...' })
    })
  })

  // Delete application if you are the applicant or tournament host based on given id
  app.post('/applications/delete', (req, res, err) => {
    const { applicationId, applicantId, hostId } = req.body

    if (applicantId !== undefined) {
      db.Application.findOne({ where: { id: applicationId, applicantId } })
      .then((application) => {
        if (application === null) return res.send({ message: 'Application doesn\'t exist.' })
        application.destroy()
        res.send({ message: 'Application was successfully deleted!' })
      })
      .catch((error) => {
        console.log(error)
        res.send({ message: 'Something went wrong trying to delete application as applicant...' })
      })
    } else if (hostId !== undefined) { // Allow the tournament host delete permission
      db.Application.findOne({ where: { id: applicationId } })
      .then((application) => {
        if (application === null) return res.send({ message: 'Application doesn\'t exist.' })

        return db.Tournament.findById(application.tournamentId)
        .then((tournament) => {
          if (tournament === null) return res.send({ message: 'Tournament doesn\'t exist.' })

          if (tournament.hostId === hostId) {
            application.destroy()
            res.send({ message: 'Application was successfully deleted!' })
          }
        })
      })
      .catch((error) => {
        console.log(error)
        res.send({ message: 'Something went wrong trying to delete application as tournament host...' })
      })
    }
  })

  // Toggles an application's status and updates and saves its entry in the database
  app.post('/applications/toggleStatus', (req, res, err) => {
    const { applicationId } = req.body
    db.Application.findById(applicationId)
    .then((application) => {
      if (application === null) return res.send({ message: 'That application doesn\'t exist.' })

      application.set('status', !application.status)
      return application.save()
      .then((result) => {
        // TODO: Handle when result is a Sequelize.ValidationError
        res.send({ tournament: result })
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({ message: 'Something went wrong with toggling the application status...' })
    })
  })
}
