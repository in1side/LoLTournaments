'use strict'

const models = require('../models')

global.db = models
db.sequelize.options.logging = false // Turn off logging
