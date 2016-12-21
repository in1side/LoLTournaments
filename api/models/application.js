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
    // State of application
    status: {
      type: DataTypes.BOOLEAN
    },
    // Tournament id
    tournamentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'applications'
  })

  return Application
}
