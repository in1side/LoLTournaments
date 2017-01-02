'use strict'

require('dotenv').config()
const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const models = require('./models')
const constants = require('../constants')
const cors = require('cors')
const path = require('path')
const jwt = require('jsonwebtoken')

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

// Only allow HTTP requests if valid JWT sent
// app.use((req, res, next) => {
//   if (req.path === '/tournament/getAll') return next() // Ignore JWT validation for this
//   const clientJWT = req.headers.authorization.substring(7) // Extract 'Bearer ' from header
//
//   jwt.verify(clientJWT, process.env.SECRET, (err) => {
//     if (err !== null) {
//       console.log('Invalid JWT... REJECTING')
//       console.log(err)
//       return res.status(500).send({ message: err })
//     }
//     console.log('Valid JWT... PASSING')
//     next()
//   })
// })

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
