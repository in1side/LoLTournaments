'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      username: 'ssorakaflockaflame',
      summonerName: 'SorakaFlockaFame',
      mainRoles: ['SUPP'],
      createdAt: (new Date()).toUTCString(),
      updatedAt: (new Date()).toUTCString()
    }, {
      username: 'tigur01',
      summonerName: 'tigur01',
      mainRoles: ['SUPP', 'ADC'],
      createdAt: (new Date()).toUTCString(),
      updatedAt: (new Date()).toUTCString()
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}
