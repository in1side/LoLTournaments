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
    // Auth0 user_id
    hostId: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    // Auth0 username
    hostUsername: {
      type: DataTypes.STRING(),
      allowNull: false
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
    // Team id's containing players participating in tournament
    teams: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    // Requirements for eligible players
    requirements: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'tournaments'
  })

  return Tournament
}
