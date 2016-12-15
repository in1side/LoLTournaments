'use strict'

module.exports = function (sequelize, DataTypes) {
  const Tournament = sequelize.define('Tournament', {
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: {
        is: /([A-Za-z0-9\-_]+)/i,
        notEmpty: true
      }
    },
    // Date tournament occurs
    date: {
      type: DataTypes.DATE,
      allowNull: false
      // TODO: Don't allow past dates
    },
    registrationDeadline: {
      type: DataTypes.DATE,
      allowNull: false
      // TODO: Don't allow past dates
    },
    server: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Total players allowed in tournament
    totalPlayers: {
      type: DataTypes.INTEGER,
      validate: {
        min: 2 // NOTE: Subject to change
      }
    },
    // Requirements for eligible players
    requirements: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'tournaments'
  })

  return Tournament
}
