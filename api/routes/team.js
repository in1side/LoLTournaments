'use strict'

module.exports = (app) => {
  app.post('/create/team', (req, res, err) => {
    const { teamName, desiredRoles, leaderUserID } = req.body

    // Leader account should exist
    const isExistingAccount = db.User.findById(leaderUserID)
    .then((result) => {
      if (!result) return false
      return true
    })

    if (!isExistingAccount) res.send({ message: 'Failed team creation: given leader\'s account does not exist.' })

    // Find or create team based on team leader ID and team name
    db.Team.findOrCreate({ where: { leaderID: leaderUserID, name: teamName }, defaults: { members: [leaderUserID], desiredRoles } })
      .spread((team, isSuccessful) => {
        if (!isSuccessful) res.send({ message: 'Failed team creation: leader already has a team with same name.' })
        res.send(team)
      }
    )
  })

  app.delete('/delete/team', (req, res, err) => {
    const { teamID, leaderUserID } = req.body

    db.Team.findById(teamID)
    .then((result) => {
      if (!result) res.send({ message: 'Failed team deletion: team doesn\'t exist.' })
      if (result.leaderID !== leaderUserID) res.send({ message: 'Failed team deletion: only team leader has permission to delete team.' })
      result.destroy()
      res.send({ message: 'Successfully deleted team.' })
    })
  })

  app.post('/search/teamID', (req, res, err) => {
    const { teamID } = req.body

    db.Team.findById(teamID)
    .then((result) => {
      result ? res.send(result) : res.send({ message: 'Team not found.' })
    })
  })

  app.post('/search/teamName', (req, res, err) => {
    const { teamName } = req.body

    db.Team.findAll({ where: { name: teamName } })
    .then((results) => {
      results.length === 0 ? res.send({ message: `No teams found with name: \"${teamName}\"` }) : res.send(results)
    })
  })
}
