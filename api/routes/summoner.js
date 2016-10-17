'use strict'

module.exports = (app) => {
  app.get('/test', (req, res, err) => {
    res.send('test passed!')
  })
}
