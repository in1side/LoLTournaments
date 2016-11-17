'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('teams', [{
      id: 1,
      name: 'team1',
      memberIDs: [1],
      desiredRoles: ['TOP', 'MID', 'JUNG'],
      leaderID: 1,
      createdAt: (new Date()).toUTCString(),
      updatedAt: (new Date()).toUTCString()
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('teams', null, {})
  }
}
