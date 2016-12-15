'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('teams', [{
      name: 'team1',
      members: [
        [
          '1',
          'testSumm',
          'ADC'
        ]
      ],
      TournamentId: 1,
      createdAt: (new Date()).toUTCString(),
      updatedAt: (new Date()).toUTCString()
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('teams', null, {})
  }
}
