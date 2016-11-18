'use strict'
// NOTE: Edited by Alexei Darmin
const util = require('../util')

const findTeamByID = (teamID) => {
  return db.Team.findById(teamID)
}

const findOrCreateTeam = ({ leaderID, teamName, desiredRoles }) => {
  return db.Team.findOrCreate({ where: { leaderID, name: teamName }, defaults: { memberIDs: [leaderID], desiredRoles } })
    .spread((team, isSuccessful) => {
      if (!isSuccessful) return null
      return team
    }
  )
}

// Return array of teams objects with specified attributes in specified sortOrder
const findAllTeamsAndSelectAttributes = (attributes, sortOrder) => {
  return db.Team.findAll({ attributes, order: sortOrder })
}

// Sets team.members attribute with a list of users that are part of the team
// Sets team.leader to the user who is the team's leader
// return team with the above two attributes filled
const getMembersUsernamesAndSaveToTeam = (team) => {
  return Promise.all(team.memberIDs.map((memberID) => {
    return util.findUserByID(memberID).then((user) => {
      if (memberID === team.leaderID) team.dataValues.leaderUsername = user.username // Assign leader username if maching memberID
      return user.username
    })
  })).then((members) => {
    team.dataValues.memberUsernames = members
    return team
  })
}

// Return promise of updated instance or null if failed.
const updateInstance = (instance, updatedValues) => {
  return instance.update(updatedValues)
}

module.exports = (app) => {
  // NOTE: Prime example of nice code
  app.get('/getAllTeams', (req, res, err) => {
    findAllTeamsAndSelectAttributes(['id', 'name', 'memberIDs', 'desiredRoles', 'leaderID'], '"updatedAt" DESC')
    .then((teams) => {
      if (teams === undefined) return res.send({ teams: [], message: 'Couldn\'t find any teams.' })

      // Get leader and members usernames via id's
      Promise.all(teams.map((team) => getMembersUsernamesAndSaveToTeam(team)))
      .then((allTeams) => {
        res.send({ teams: allTeams })
      })
    })
  })

  app.post('/create/team', (req, res, err) => {
    util.findUserByID(req.body.leaderID)
    .then((user) => {
      if (user === null) return res.send({ message: 'Failed team creation: given leader\'s account does not exist.' })

      findOrCreateTeam(req.body)
      .then((team) => {
        team === null
          ? res.send({ message: 'Failed team creation: leader already has a team with same name.' })
          : res.send(team)
      })
    })
  })

  app.delete('/delete/team', (req, res, err) => {
    const { teamID, leaderID } = req.body
    const result = {}

    findTeamByID(teamID)
    .then((team) => {
      if (team === null) result.message = 'Failed team deletion: team doesn\'t exist.'
      if (team.leaderID !== leaderID) result.message = 'Failed team deletion: only team leader has permission to delete team.'

      team.destroy()
      result.message = 'Successfully deleted team.'

      res.send(result)
    })
  })

  app.post('/search/teamID', (req, res, err) => {
    findTeamByID(req.body.teamID)
    .then((team) => {
      getMembersUsernamesAndSaveToTeam(team)
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

    findTeamByID(teamID)
    .then((team) => {
      if (team === null) return res.send({ message: 'Team not found' })
      if (leaderID !== team.leaderID) return res.send({ message: 'Failed to edit team members: only team leader has permission.' })

      updateInstance(team, updatedValues)
      .then((team) => {
        res.send(team)
      })
    })
  })
}
