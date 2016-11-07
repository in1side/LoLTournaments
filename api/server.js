'use strict'

const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const models = require('./models')
const consants = require('./constants')

// Constants
global.db = models
global.constants = consants
const ROUTES_PATH = __dirname + '/routes'
let dbSyncConfig = {
  force: false
}

console.log('current env: ', process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'production') {
  console.log('Overwriting DB...')
  dbSyncConfig.force = true
}

// Set up associations and initialize Sequelize
db.User.belongsTo(db.Team)
models.sequelize.sync(dbSyncConfig)

// graphQL
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = { hello: () => 'Hello world!' }

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

/**
* Require all route files in the 'routes' directory.
* @param {Express Application} expressApp - an express app instance
*/
function getAllRoutes (expressApp) {
  fs.readdirSync(ROUTES_PATH).forEach(function (file) {
    if (file === 'index.js') return
    const filePath = ROUTES_PATH + '/' + file
    require(filePath)(expressApp)
  })
}

getAllRoutes(app)

app.listen(3000, function () {
  console.log('app running on port 3000!')
})
