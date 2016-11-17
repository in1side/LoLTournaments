'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      username: 'user1',
      summonerName: 'summ1',
      mainRoles: ['ADC'],
      createdAt: (new Date()).toUTCString(),
      updatedAt: (new Date()).toUTCString()
    }, {
      id: 2,
      username: 'user2',
      summonerName: 'summ2',
      mainRoles: ['SUPP'],
      createdAt: (new Date()).toUTCString(),
      updatedAt: (new Date()).toUTCString()
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}
