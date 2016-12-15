'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tournaments', [{
      name: 'Tournament 1',
      date: new Date(2016, 12, 25, 9, 0),
      registrationDeadline: new Date(2016, 12, 24, 9, 0),
      server: 'NA',
      totalPlayers: 10,
      requirements: null,
      description: 'Tournament description.',
      createdAt: (new Date()).toUTCString(),
      updatedAt: (new Date()).toUTCString()
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('teams', null, {})
  }
}
