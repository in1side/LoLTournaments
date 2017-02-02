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
const ROOT_DIRECTORY = 1

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

function getUserTypeFrom (authProfile) {
  return JSON.parse(authProfile).user_metadata.userType
}

// Check for valid accessToken when creating or deleting
app.use((req, res, next) => {
  const pathDirectories = req.path.split('/')
  // Allow access if not creating or deleting
  if (!pathDirectories.includes('create') && !pathDirectories.includes('delete') && !pathDirectories.includes('toggleIsApproved')) return next()

  // Check if hostId is an actual valid host
  const options = {
    url: 'https://bsoropia.auth0.com/userinfo',
    headers: {
      Authorization: req.get('Authorization')
    }
  }

  request(options, (error, response, profile) => {
    // Valid accessToken proceeds
    if ((error === null) && (response.statusCode === 200)) {
      const userType = getUserTypeFrom(profile)

      if (userType === 'contestant') { // Contestant can only create and delete applications
        return pathDirectories[ROOT_DIRECTORY] !== 'application'
          ? res.status(401).type('application/json').send({ message: 'Only hosts can perform this action.' })
          : next()
      } else if (userType === 'host') { // Host can't create applications, but can create, edit and delete tournaments and delete and toggle application status applications
        return (pathDirectories[ROOT_DIRECTORY] === 'application') && (pathDirectories.includes('create'))
          ? res.status(401).type('application/json').send({ message: 'Only contestants can perform this action.' })
          : next()
      }
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
