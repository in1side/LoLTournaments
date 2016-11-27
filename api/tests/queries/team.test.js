'use strict'

import test from 'ava'

import query from '../../queries/team'

test.before(t => {
  return Promise.all([
    db.User.belongsTo(db.Team),
    db.sequelize.sync({ force: true })
  ])
})

test.beforeEach(t => {
  return Promise.all([
    db.User.bulkCreate([
      {
        username: 'user1',
        summonerName: 'summoner1',
        mainRoles: ['ADC'],
        createdAt: (new Date()).toUTCString(),
        updatedAt: (new Date()).toUTCString()
      },
      {
        username: 'user2',
        summonerName: 'summoner2',
        mainRoles: ['SUPP']
      },
      {
        username: 'user3',
        summonerName: 'summoner3',
        mainRoles: ['MID']
      }
    ]),
    db.Team.bulkCreate([
      {
        name: 'team1',
        memberIDs: [1],
        desiredRoles: ['TOP', 'MID', 'JUNG', 'SUPP'],
        leaderID: 1,
        createdAt: '2015-11-27T00:23:16.000Z',
        updatedAt: '2015-11-27T00:23:16.000Z'
      },
      {
        name: 'team2',
        memberIDs: [2],
        desiredRoles: ['TOP', 'MID', 'JUNG', 'ADC'],
        leaderID: 2,
        createdAt: '2015-11-27T00:23:16.000Z',
        updatedAt: '2016-11-27T00:23:16.000Z'
      }
    ])
  ])
})

test.afterEach(t => {
  return db.sequelize.sync({ force: true })
})

test.serial('Returns team when searching for team by id', t => {
  return query.findTeamByID(1)
  .then((team) => {
    t.truthy(team, 'Team with id "1" doesn\'t exists')
  })
})

test.serial('Returns null when can\'t find team with id', t => {
  return query.findTeamByID(3)
  .then((team) => {
    t.is(team, null, 'Team with id "3" shouldn\'t exist but found somehow')
  })
})

test.serial('Creates team when given leader who doesn\'t own a team, unique team name and desired roles', t => {
  return query.findOrCreateTeam({ leaderID: 3, teamName: 'team3', desiredRoles: ['ADC', 'SUPP', 'JUNG', 'TOP'] })
  .then((team) => {
    t.truthy(team, 'Team was not successfully made')
  })
})

test.serial('Creates team when leader owns a different team but given unique team name and desired roles', t => {
  return query.findOrCreateTeam({ leaderID: 1, teamName: 'team3', desiredRoles: ['ADC', 'SUPP', 'JUNG', 'TOP'] })
  .then((team) => {
    t.truthy(team, 'Team was not successfully made')
  })
})

test.serial('Returns null when given duplicate leader and team name', t => {
  return query.findOrCreateTeam({ leaderID: 1, teamName: 'team1', desiredRoles: ['ADC', 'SUPP', 'JUNG', 'TOP'] })
  .then((team) => {
    t.is(team, null, 'Team was made for some reason')
  })
})

test.serial('Returns unsorted, all teams with given attributes, when DB is populated', t => {
  return query.findAllTeamsAndSelectAttributes(['id', 'name'])
  .then((teams) => {
    t.deepEqual(
      teams,
      [
        { id: 1, name: 'team1' },
        { id: 2, name: 'team2' }
      ],
      'Didn\'t find any teams or incorrect attributes returned')
  })
})

test.serial('Returns unsorted all teams and all their attributes when not given selected attributes and DB is populated', t => {
  return query.findAllTeamsAndSelectAttributes(['id', 'name', 'memberIDs', 'desiredRoles', 'leaderID'])
  .then((teams) => {
    t.deepEqual(teams,
      [
        {
          id: 1,
          name: 'team1',
          memberIDs: [1],
          desiredRoles: [ 'TOP', 'MID', 'JUNG', 'SUPP' ],
          leaderID: 1
        },
        {
          id: 2,
          name: 'team2',
          memberIDs: [2],
          desiredRoles: [ 'TOP', 'MID', 'JUNG', 'ADC' ],
          leaderID: 2
        }
      ],
      'Didn\'t find any teams or incorrect attributes returned')
  })
})

test.serial('Returns empty array when trying to find all teams on empty DB', t => {
  return db.Team.sync({ force: true }).then(() => {
    query.findAllTeamsAndSelectAttributes(['id', 'name', 'memberIDs', 'desiredRoles', 'leaderID'])
    .then((teams) => {
      t.deepEqual(teams, [], 'Didn\'t find any teams or incorrect attributes returned')
    })
  })
})

test.serial('Returns all teams sorted by most recent updatedAt timestamps, when DB is populated', t => {
  return query.findAllTeamsAndSelectAttributes(['id'], '"updatedAt" DESC')
  .then((teams) => {
    t.deepEqual(teams,
      [{ id: 2 }, { id: 1 }],
      'Didn\'t find any teams or incorrectly sorted')
  })
})

test.serial('Returns teams sorted by id when timestamps are the same (used createdAt)', t => {
  return query.findAllTeamsAndSelectAttributes(['id'], '"createdAt" DESC')
  .then((teams) => {
    t.deepEqual(teams,
      [{ id: 1 }, { id: 2 }],
      'Sorted incorrectly')
  })
})

test.serial('Returns team with additional member and leader usernames found using id\'s', t => {
  return query.getMembersUsernamesAndSaveToTeam({ memberIDs: [1, 2], leaderID: 1 })
  .then((team) => {
    t.deepEqual(
      team,
      {
        memberIDs: [1, 2],
        leaderID: 1,
        members: ['user1', 'user2'],
        leader: 'user1'
      }
    )
  })
})

test.serial('Adding non-existing member or leader username to team throws error ', t => {
  t.throws(query.getMembersUsernamesAndSaveToTeam({ memberIDs: [4], leaderID: 4 }))
  t.throws(query.getMembersUsernamesAndSaveToTeam({ memberIDs: [1, 4], leaderID: 1 }))
})

test.serial('Updates existing team', t => {
  return db.Team.findById(1)
  .then((team) => {
    query.updateInstance(team, { name: 'updated team name' })
    .then((updatedTeam) => {
      t.is(updatedTeam.name, 'updated team name')
    })
  })
})

test.serial('Updating non-existing team throws error', t => {
  t.throws(db.Team.findById(-1)
    .then((team) => {
      query.updateInstance(team, { name: 'updated team name' })
      .then((updatedTeam) => {
        t.is(updatedTeam.name, 'updated team name')
      })
    })
  )
})
