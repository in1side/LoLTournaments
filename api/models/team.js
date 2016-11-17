'use strict'

const constants = require('../../constants')

module.exports = function (sequelize, DataTypes) {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING(constants.MAX_TEAM_NAME_LENGTH),
      allowNull: false,
      validate: {
        is: /([A-Za-z0-9\-\_]+)/i,
        notEmpty: true
      }
    },
    memberIDs: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
    desiredRoles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isIn: (value) => {
          value.forEach((role) => {
            if (!constants.ALLOWED_ROLES.includes(role)) {
              throw new Error('Given invalid role.')
            }
          })
        },
        notEmpty: true
      }
    },
    leaderID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'teams'
  })

  return Team
}
