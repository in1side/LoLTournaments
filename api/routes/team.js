'use strict'

// Format members array into { userID: name, isTeamLeader: bool },
// NOTE: Editted by Alexei Darmin
const findUserByID = (userID) => {
  return db.User.findById(userID)
  .then((user) => user)
}

const findOrCreateTeamWithGivenLeaderTeamNameAndDesiredRoles = ({ leaderID, teamName, desiredRoles }) => {
  return db.Team.findOrCreate({ where: { leaderID, name: teamName }, defaults: { memberIDs: [leaderID], desiredRoles } })
    .spread((team, isSuccessful) => {
      if (!isSuccessful) return null
      return team
    }
  )
}

/**
* @param {attributes} - array of strings
* @param {sortOrder} - string
* @return {team} - object
*/
const findAllTeamsAndSelectAttributes = (attributes, sortOrder) => {
  db.Team.findAll({ attributes, order: sortOrder })
  .then((teams) => teams)
}

// TODO: Refactor search for team since it's repeated. Use a function given teamID, and error messages to send back
module.exports = (app) => {
  // NOTE: Prime example of nice code
  app.get('/getAllTeams', (req, res, err) => {
    // db.Team.findAll({ attributes: ['id', 'name', 'memberIDs', 'desiredRoles', 'leaderID'], order: '"updatedAt" DESC' })
    // .then((teams) => {
      const teams = findAllTeamsAndSelectAttributes(['id', 'name', 'memberIDs', 'desiredRoles', 'leaderID'], '"updatedAt" DESC')

      if (teams !== undefined) {
        // Replace leader and member id's into string usernames
        teams.forEach((team) => {
          team.members = team.memberIDs.map((memberID) => findUserByID(memberID))
          team.leader = findUserByID(team.leaderID).username
        })
      }

      res.send({ teams })
    // })
  })

  app.post('/create/team', (req, res, err) => {
    if (findUserByID(req.body.leaderID) === null) return res.send({ message: 'Failed team creation: given leader\'s account does not exist.' })

    const team = findOrCreateTeamWithGivenLeaderTeamNameAndDesiredRoles(req.body)
    team === null
      ? res.send({ message: 'Failed team creation: leader already has a team with same name.' })
      : res.send(team)
  })

  app.delete('/delete/team', (req, res, err) => {
    const { teamID, leaderUserID } = req.body

    db.Team.findById(teamID)
    .then((team) => {
      if (!team) return res.send({ message: 'Failed team deletion: team doesn\'t exist.' })
      if (team.leaderID !== leaderUserID) return res.send({ message: 'Failed team deletion: only team leader has permission to delete team.' })
      team.destroy()
      return res.send({ message: 'Successfully deleted team.' })
    })
  })

  app.post('/search/teamID', (req, res, err) => {
    const { teamID } = req.body

    db.Team.findById(teamID)
    .then((team) => {
      team ? res.send(team) : res.send({ message: 'Team not found.' })
    })
  })

  app.post('/search/teamName', (req, res, err) => {
    const { teamName } = req.body

    db.Team.findAll({ where: { name: teamName } })
    .then((teamsArray) => {
      teamsArray.length === 0 ? res.send({ message: `No teams found with name: \"${teamName}\"` }) : res.send(teamsArray)
    })
  })

  /** TODO: Ways to edit team (only leader can make changes):
  * - name
  * - leaderID
  */
  app.post('/edit/teamMembers', (req, res, err) => {
    const { teamID, leaderUserID, membersArray } = req.body

    db.Team.findById(teamID)
    .then((team) => {
      if (!team) return res.send({ message: 'Team not found' })
      if (leaderUserID !== team.leaderID) return res.send({ message: 'Failed to edit team members: only team leader has permission.' })

      team.update({
        memberIDs: membersArray
      })
      .then(() => {
        return res.send(team)
      })
    })
  })

  app.post('/edit/teamDesiredRoles', (req, res, err) => {
    const { teamID, leaderUserID, desiredRoles } = req.body

    db.Team.findById(teamID)
    .then((team) => {
      if (!team) return res.send({ message: 'Team not found' })
      if (leaderUserID !== team.leaderID) return res.send({ message: 'Failed to edit team available roles: only team leader has permission.' })

      team.update({
        desiredRoles
      })
      .then(() => {
        return res.send(team)
      })
    })
  })
}
