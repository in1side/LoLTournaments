const models = require('../models')

module.exports = (app) => {
  app.get('/', (req, res, err) => {
    models.User.findAll({
      include: [ models.Task ]
    }).then(function (users) {
      res.send({
        title: 'Sequelize: Express Example',
        users: users
      })
    })
  })

  app.post('/testPost', (req, res, err) => {
    res.send(req.body)
  })

  app.post('/graphqlTest', (req, res, err) => {

  })
}
