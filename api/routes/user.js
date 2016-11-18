'use strict'

const util = require('../util')

const findOrCreateUser = ({ username, summonerName, mainRoles, timeZone, server }) => {
  return db.User.findOrCreate({ where: { username, summonerName }, defaults: { mainRoles, timeZone, server } })
}

module.exports = (app) => {
  app.post('/create/user', (req, res, err) => {
    if (req.body.summonerName.length > constants.SUMMONER_MAX_LEN) return res.send({ message: `Invalid summonerName: over ${constants.SUMMONER_MAX_LEN} characters.` })

    findOrCreateUser(req.body)
    .spread((user, isSuccessful) => {
      isSuccessful ? res.send(user) : res.send({ message: 'Failed user creation: user already exists.' })
    })
  })

  app.post('/search/userID', (req, res, err) => {
    const { userID } = req.body
    console.log('Received user ID: ', userID)

    util.findUserByID(userID)
      .then((result) => {
        result ? res.send(result) : res.send({ message: 'User not found.' })
      })
  })

  app.post('/search/username', (req, res, err) => {
    const { username } = req.body

    db.User.findOne({ where: { username } })
      .then((result) => {
        result ? res.send(result) : res.send({ message: 'User not found.' })
      })
  })
}
