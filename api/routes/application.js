'use strict'

const db = require('../models')

module.exports = (app) => {
  // Get all applications to a tournament
  app.post('/application/getAllForTournament', (req, res, err) => {
    const { tournamentId } = req.body

    db.Application.findAll({ attributes: ['id', 'summonerName', 'isApproved'], where: { tournamentId } })
    .then((applications) => {
      if (applications === null) return res.status(200).send({ message: 'No applications exist for this tournament.' })
      res.status(200).send({ applications })
    })
    .catch((error) => {
      console.log(error)
      res.status(200).send({ error: 'Something broke when trying to get all applications for tournament...' })
    })
  })

  // Search for tournament with given id and get its name. Throw error if not found
  function promiseToGetTournamentNameFromId (id) {
    return db.Tournament.findById(id)
    .then((tournament) => {
      if (tournament === null) throw new Error('Tournament doesn\'t exist!')

      return tournament.name
    })
  }

  // TODO: Refactor this to not reiterate over applications again to append tournament names
  // Get all applications made by user
  app.post('/application/getAllForContestant', (req, res, err) => {
    const { userId } = req.body
    // Get all applications for contestant
    db.Application.findAll({ attributes: ['id', 'isApproved', 'tournamentId'], where: { userId } })
    .then((applications) => {
      if (applications.length === 0) return res.status(200).send({ message: 'No applications exist for this contestant.' })

      // Append tournament names to applications
      const p1 = new Promise((resolve, reject) => {
        const getTournamentNamePendingPromises = applications.map((application) => {
          return promiseToGetTournamentNameFromId(application.tournamentId)
        })

        // Get all tournament names in an array matching the order of given applications
        Promise.all(getTournamentNamePendingPromises)
        .then((tournamentNames) => {
          const applicationsWithTournamentName = applications.map((application, applicationIndex) => {
            application.dataValues.tournamentName = tournamentNames[applicationIndex]

            return application
          })
          resolve(applicationsWithTournamentName)
        })
      })

      p1.then((result) => {
        res.status(200).send({ applications: result })
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error: 'Something broke when trying to get all applications for contestant...' })
    })
  })

  // Creates an application to a specified, existing tournament
  app.post('/application/create', (req, res, err) => {
    const { tournamentId, userId, summonerName } = req.body

    // Check if tournament even exists
    db.Tournament.findById(tournamentId)
    .then((tournament) => {
      if (tournament === null) return res.status(200).send({ message: 'The given tournament doesn\'t exist.' })

      return db.Application.findOrCreate({ where: { tournamentId, userId }, defaults: { summonerName, isApproved: false } })
      .spread((application, isSuccessful) => {
        if (!isSuccessful) return res.status(200).send({ message: 'You\'ve already made an application to this tournament' })
        return res.status(201).send({ message: 'Successfully created new application!' })
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error: 'Something went wrong when trying to create an application...' })
    })
  })

  // Delete application if you are the applicant or tournament host based on given id
  app.post('/application/delete', (req, res, err) => {
    const { applicationId, userId, hostId } = req.body

    if (userId !== undefined) {
      db.Application.findOne({ where: { id: applicationId, userId } })
      .then((application) => {
        if (application === null) return res.status(200).send({ message: 'Application doesn\'t exist.' })
        application.destroy()
        res.status(200).send({ message: 'Application was successfully deleted!' })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send({ error: 'Something went wrong trying to delete application as applicant...' })
      })
    } else if (hostId !== undefined) { // Allow the tournament host delete permission
      db.Application.findOne({ where: { id: applicationId } })
      .then((application) => {
        if (application === null) return res.status(200).send({ message: 'Application doesn\'t exist.' })

        return db.Tournament.findById(application.tournamentId)
        .then((tournament) => {
          if (tournament === null) return res.status(200).send({ message: 'Tournament doesn\'t exist.' })

          if (tournament.hostId === hostId) {
            application.destroy()
            res.status(200).send({ message: 'Application was successfully deleted!' })
          }
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send({ error: 'Something went wrong trying to delete application as tournament host...' })
      })
    }
  })

  // Toggles an application's isApproved status and updates and saves its entry in the database
  app.post('/application/toggleIsApproved', (req, res, err) => {
    const { applicationId } = req.body
    db.Application.findById(applicationId)
    .then((application) => {
      if (application === null) return res.status(200).send({ message: 'That application doesn\'t exist.' })

      application.set('isApproved', !application.isApproved)
      return application.save()
      .then((result) => {
        // TODO: Handle when result is a Sequelize.ValidationError
        res.status(200).send({ tournament: result })
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error: 'Something went wrong when trying to toggle the application approved status...' })
    })
  })
}
