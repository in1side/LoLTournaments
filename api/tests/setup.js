'use strict'

console.log('env: ', process.env.NODE_ENV)
console.log('Setting up Test-LoLTeams DB')

const models = require('../models')
models.sequelize.sync({ force: true })
