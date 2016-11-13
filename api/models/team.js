'use strict'

const constants = require('../../constants')

module.exports = function (sequelize, DataTypes) {
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(constants.MAX_TEAM_NAME_LENGTH),
      allowNull: false,
      validate: {
        is: /([A-Za-z0-9\-\_]+)/i,
        notEmpty: true
      }
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false
    },
    desiredRoles: {
      type: DataTypes.JSON(),
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
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'teams'
  })

  return Team
}
