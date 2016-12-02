'use strict'
// NOTE: Edited by Alexei Darmin
const util = require('../util')
const query = require('../queries/team')
// const _ = require('lodash')

module.exports = (app) => {
  app.post('/search/teamByLeaderID', (req, res, err) => {
    const { leaderID } = req.body

    query.findAllTeamsWithLeaderIDAndSelectAttributes(leaderID, ['id', 'name', 'memberIDs', 'desiredRoles', 'leaderID'])
    .then((teams) => {
      if (teams === undefined) return res.send({ teams: [], message: 'Couldn\'t find any teams with given leader.' })

      Promise.all(teams.map((team) => query.getMembersUsernamesAndSaveToTeam(team)))
      .then((allTeams) => {
        res.send({ teams: allTeams })
      })
    })
  })

  // NOTE: Prime example of nice code
  app.get('/getAllTeams', (req, res, err) => {
    query.findAllTeamsAndSelectAttributes(['id', 'name', 'memberIDs', 'desiredRoles', 'leaderID'], '"updatedAt" DESC')
    .then((teams) => {
      if (teams === undefined) return res.send({ teams: [], message: 'Couldn\'t find any teams.' })

      // Get leader and members usernames via id's
      Promise.all(teams.map((team) => query.getMembersUsernamesAndSaveToTeam(team)))
      .then((allTeams) => {
        res.send({ teams: allTeams })
      })
    })
  })

  app.post('/create/team', (req, res, err) => {
    util.findUserByID(req.body.leaderID)
    .then((user) => {
      if (user === null) return res.send({ message: 'Failed team creation: given leader\'s account does not exist.' })

      query.findOrCreateTeam(req.body)
      .then((team) => {
        team === null
          ? res.send({ message: 'Failed team creation: leader already has a team with same name.' })
          // TODO: Refactor this to extract the right attributes
          : query.getMembersUsernamesAndSaveToTeam(team).then(({ id, name, memberIDs, desiredRoles, leaderID, leader, members }) => {
            res.send({ id, name, memberIDs, desiredRoles, leaderID, leader: team.dataValues.leader, members: team.dataValues.members })
          })
      })
    })
  })

  // // Return a number value depending on given ranked tier
  // function getTierValue (tier) {
  //   switch (tier) {
  //     case 'BRONZE':
  //       return 0
  //     case 'SILVER':
  //       return 5
  //     case 'GOLD':
  //       return 10
  //     case 'PLATINUM':
  //       return 15
  //     case 'DIAMOND':
  //       return 20
  //     case 'MASTER':
  //       return 25
  //     case 'CHALLENGER':
  //       return 30
  //   }
  // }
  //
  // // Return a number value depending on given tier division
  // function getDivisionValue (division) {
  //   switch (division) {
  //     case 'I':
  //       return 4
  //     case 'II':
  //       return 3
  //     case 'III':
  //       return 2
  //     case 'IV':
  //       return 1
  //     case 'V':
  //       return 0
  //   }
  // }

  // // Given array of participant objects, append converted ranked values to each participant
  // function setParticipantsRankedValues (participants) {
  //   return participants.map((participant) => {
  //     participant.value = getTierValue(participant.tier) + getDivisionValue(participant.division)
  //     return participant
  //   })
  // }
  //
  // function averageParticapantValue (participants) {
  //   let sum = 0
  //   participants.forEach((participant) => {
  //     sum += participant.value
  //   })
  //
  //   return sum / participants.length
  // }

  // participants: [{ summonerName, role, tier, division }, ...]
  // TODO: Write a balanced team generator function
  // app.post('/create/balancedTeams', (req, res, err) => {
  //   const { participants } = req.body
  //   const ADCs = []
  //   const SUPPs = []
  //   const TOPs = []
  //   const MIDs = []
  //   const JUNGs = []
  //
  //
  //   const updatedParticipants = setParticipantsRankedValues(participants)
  //   const averageValue = averageParticapantValue(updatedParticipants)
  //
  //   // Sort participants by value
  //   const participantsInAscendingValue = _.sortBy(updatedParticipants, (participant) => participant.value)
  //   // Sort by role
  //   // Find least populated roles, setting it as num teams to make
  //   // Make every possible set of teams
  //   // Pick closest set to average
  // })

  app.delete('/delete/team', (req, res, err) => {
    const { teamID, leaderID } = req.body
    const result = {}

    query.findTeamByID(teamID)
    .then((team) => {
      if (team === null) result.message = 'Failed team deletion: team doesn\'t exist.'
      if (team.leaderID !== leaderID) result.message = 'Failed team deletion: only team leader has permission to delete team.'

      team.destroy()
      result.message = 'Successfully deleted team.'

      res.send(result)
    })
  })

  app.post('/search/teamID', (req, res, err) => {
    query.findTeamByID(req.body.teamID)
    .then((team) => {
      query.getMembersUsernamesAndSaveToTeam(team)
      .then((teamWithMemberUsernames) => {
        teamWithMemberUsernames ? res.send(teamWithMemberUsernames) : res.send({ message: 'Team not found.' })
      })
    })
  })

  app.post('/search/teamName', (req, res, err) => {
    const { teamName } = req.body

    db.Team.findAll({ where: { name: teamName } })
    .then((teamsArray) => {
      teamsArray.length === 0 ? res.send({ message: `No teams found with name: \"${teamName}\"` }) : res.send(teamsArray)
    })
  })

  app.post('/edit/team', (req, res, err) => {
    const { teamID, leaderID, updatedValues } = req.body

    query.findTeamByID(teamID)
    .then((team) => {
      if (team === null) return res.send({ message: 'Team not found' })
      if (leaderID !== team.leaderID) return res.send({ message: 'Failed to edit team members: only team leader has permission.' })

      query.updateInstance(team, updatedValues)
      .then((team) => {
        res.send(team)
      })
    })
  })
}
