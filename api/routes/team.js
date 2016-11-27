'use strict'
// NOTE: Edited by Alexei Darmin
const util = require('../util')
const query = require('../queries/team')

module.exports = (app) => {
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
