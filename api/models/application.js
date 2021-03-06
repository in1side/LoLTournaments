'use strict'

module.exports = function (sequelize, DataTypes) {
  const Application = sequelize.define('Application', {
    // Application's summonerName
    summonerName: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: {
        is: /([A-Za-z0-9\-_]+)/i,
        notEmpty: true
      }
    },
    // Auth0 userID
    userId: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    // State of application
    isApproved: {
      type: DataTypes.BOOLEAN
    },
    // Tournament id
    tournamentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Team that the applicant belongs to. Should only be set when status is true
    teamId: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'applications'
  })

  return Application
}
