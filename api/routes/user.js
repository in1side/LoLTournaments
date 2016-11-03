'use strict'

module.exports = (app) => {
  app.post('/createUser', (req, res, err) => {
    const { username, summonerName, mainRoles, timeZone, server } = req.body
    db.User.findOrCreate({ where: { username, summonerName }, defaults: { mainRoles, timeZone, server } })
      .spread((user, created) => {
        console.log(user.get({
          plain: true
        }))
        console.log(created)
      })
    const poo = req.body
    res.send(poo)
  })
}
