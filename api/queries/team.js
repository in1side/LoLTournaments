'use strict'

const util = require('../util')
const db = require('../models')

module.exports = {
  findAllTeamsWithLeaderIDAndSelectAttributes: (leaderID, attributes) => {
    return db.Team.findAll({ attributes, where: { leaderID }, raw: true })
  },
  findTeamByID: (teamID) => {
    return db.Team.findById(teamID, { raw: true })
  },
  findOrCreateTeam: ({ leaderID, teamName, desiredRoles }) => {
    return db.Team.findOrCreate({ where: { leaderID, name: teamName }, defaults: { memberIDs: [leaderID], desiredRoles }, raw: true })
      .spread((team, isSuccessful) => {
        if (!isSuccessful) return null
        return team
      }
    )
  },
  // Return array of teams objects with specified attributes in specified sortOrder
  findAllTeamsAndSelectAttributes: (attributes, sortOrder) => {
    return db.Team.findAll({ attributes, order: sortOrder, raw: true })
  },
  // Sets team.members attribute with a list of users that are part of the team
  // Sets team.leader to the user who is the team's leader
  // return team with the above two attributes filled
  getMembersUsernamesAndSaveToTeam: (team) => {
    return Promise.all(team.memberIDs.map((memberID) => {
      return util.findUserByID(memberID, { raw: true }).then((user) => {
        if (memberID === team.leaderID) team.leader = user.username // Assign leader username if maching memberID
        return user.username
      })
    })).then((members) => {
      team.members = members
      return team
    })
  },
  // Return promise of updated instance or null if failed.
  // NOTE: Can't be passed an instance from a query with active raw option
  updateInstance: (instance, updatedValues) => {
    return instance.update(updatedValues)
  }
}
