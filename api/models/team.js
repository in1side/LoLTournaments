'use strict'

module.exports = function (sequelize, DataTypes) {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /([A-Za-z0-9\-\_]+)/i,
        notEmpty: true
      }
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      validate: {
        isArray: true
      }
    },
    desiredRoles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isIn: [['TOP', 'MID', 'ADC', 'SUPP', 'JUNG', 'ANY']],
        notNull: true,
        notEmpty: true,
        isArray: true
      }
    },
    leader: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'teams'
  })

  return Team
}
