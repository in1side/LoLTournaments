'use strict'

const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const models = require('./models')
const constants = require('../constants')
const cors = require('cors')
const path = require('path')
const request = require('request')

// Constants
global.db = models
global.constants = constants
const ROUTES_PATH = path.join(__dirname, 'routes')
let dbSyncConfig = {
  force: false
}

console.log('current env: ', process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'production') {
  console.log('Overwriting DB...')
  dbSyncConfig.force = true
}

// Set up associations and initialize Sequelize
db.Team.belongsTo(db.Tournament, { as: 'tournament', onDelete: 'CASCADE' })
db.Application.belongsTo(db.Tournament, { as: 'tournament', onDelete: 'CASCADE' })
db.Application.belongsTo(db.Team, { as: 'team', onDelete: 'CASCADE' })
models.sequelize.sync(dbSyncConfig)

// Express Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// Check for valid accessToken
app.use((req, res, next) => {
  // Only check for creating and deleting tournament
  if ((req.path !== '/tournament/create') || (req.path !== '/tournament/create')) return next()

  // Check if hostId is an actual valid host
  const options = {
    url: 'https://bsoropia.auth0.com/userinfo',
    headers: {
      Authorization: req.get('Authorization')
    }
  }

  request(options, (error, response, body) => {
    // Valid accessToken proceeds
    if ((error === null) && (response.statusCode === 200)) {
      if (JSON.parse(body).user_metadata.userType !== 'host') return res.status(401).type('application/json').send({ message: 'Only hosts can perform these actions.' })

      return next()
    } else { // Error or non success statusCode received
      console.log('Error:', error)
      return res.status(401).type('application/json').send({ message: 'Sorry, an error occured... Please check your input and try again.' })
    }
  })
})

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
