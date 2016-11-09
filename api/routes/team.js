'use strict'

// TODO: Refactor search for team since it's repeated. Use a function given teamID, and error messages to send back
module.exports = (app) => {
  app.post('/create/team', (req, res, err) => {
    const { teamName, desiredRoles, leaderUserID } = req.body

    // Leader account should exist
    const isExistingUser = db.User.findById(leaderUserID)
    .then((user) => {
      if (!user) return false
      return true
    })

    if (!isExistingUser) return res.send({ message: 'Failed team creation: given leader\'s account does not exist.' })

    // Find or create team based on team leader ID and team name
    db.Team.findOrCreate({ where: { leaderID: leaderUserID, name: teamName }, defaults: { members: [leaderUserID], desiredRoles } })
      .spread((team, isSuccessful) => {
        if (!isSuccessful) return res.send({ message: 'Failed team creation: leader already has a team with same name.' })
        return res.send(team)
      }
    )
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
        members: membersArray
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
