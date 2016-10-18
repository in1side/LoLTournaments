module.exports = (app) => {
  app.get('/', (req, res, err) => {
    res.send('Hello World hahah')
  })

  app.post('/testPost', (req, res, err) => {
    res.send(req.body)
  })

  app.post('/graphqlTest', (req, res, err) => {

  })
}
