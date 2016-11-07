'use strict'

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /([A-Za-z0-9\-\_]+)/i,
        notEmpty: true
      }
    },
    summonerName: {
      type: DataTypes.STRING(14),
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
      type: DataTypes.ARRAY(DataTypes.UUID),
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
