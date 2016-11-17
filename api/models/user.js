'use strict'

const constants = require('../../constants')

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /([A-Za-z0-9\-\_]+)/i,
        notEmpty: true
      }
    },
    summonerName: {
      type: DataTypes.STRING(constants.SUMMONER_MAX_LEN),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    mainRoles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isIn: (value) => {
          value.forEach((role) => {
            if (!constants.ALLOWED_ROLES.includes(role)) {
              throw new Error('Given invalid role.')
            }
          })
        }
      }
    },
    teams: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        isArray: true
      }
    },
    availability: {
      type: DataTypes.ARRAY(DataTypes.DATE)
    },
    timeZone: {
      type: DataTypes.STRING
    },
    server: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['BR', 'EUNE', 'EUW', 'LAN', 'LAS', 'NA', 'OCE', 'RU', 'TR', 'JP', 'SEA', 'KR']]
      }
    }
  }, {
    tableName: 'users'
  })

  return User
}
