'use strict'

const constants = require('../../constants')

module.exports = function (sequelize, DataTypes) {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING(constants.MAX_TEAM_NAME_LENGTH),
      validate: {
        is: /([A-Za-z0-9\-_]+)/i,
        notEmpty: true
      }
    },
    // Array of arrays containing member id (Auth0 id's), summoner name and role (role is null if ARAM tournament)
    members: {
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
      allowNull: false
    },
    // Tournament id
    tournamentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'teams'
  })

  return Team
}
