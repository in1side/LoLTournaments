'use strict'

module.exports = (app) => {
  app.post('/create/user', (req, res, err) => {
    const { username, summonerName, mainRoles, timeZone, server } = req.body
    db.User.findOrCreate({ where: { username, summonerName }, defaults: { mainRoles, timeZone, server } })
      .spread((user, isSuccessful) => {
        isSuccessful ? res.send(user) : res.send({ message: 'Failed user creation: user already exists.' })
      }
    )
  })

  app.post('/search/userID', (req, res, err) => {
    const { userID } = req.body
    console.log('Received user ID: ', userID)

    db.User.findById(userID)
      .then((result) => {
        result ? res.send(result) : res.send({ message: 'User not found.' })
      })
  })

  app.post('/search/username', (req, res, err) => {
    const { username } = req.body
    console.log('Received username: ', username)

    db.User.findOne({ where: { username } })
      .then((result) => {
        result ? res.send(result) : res.send({ message: 'User not found.' })
      })
  })
}
