'use strict'

import test from 'ava'

// -------------------------------------------
// username
// -------------------------------------------
test.todo('More than 255 char username')
test.todo('Null username')
test.todo('Empty string username')
test.todo('Only letters, numbers, underscores, dashes')
test.todo('Weird characters')

// -------------------------------------------
// summonerName
// -------------------------------------------
test.todo('1 char summonerName')
test.todo('more than 14 char summonerName')
test.todo('Null summonerName')
test.todo('Empty string summonerName')

// -------------------------------------------
// teams
// -------------------------------------------
test.todo('Null teams')
test.todo('Not given an array for teams')
test.todo('Not an array of UUID\'s')
test.todo('0 teams')
test.todo('1 team')
test.todo('Many teams')

// -------------------------------------------
// mainRoles
// -------------------------------------------
test.todo('Null mainRoles')
test.todo('Given array with null in mainRoles')
test.todo('Not given an array')
test.todo('Not an array of strings')
test.todo('Not given any of the defined roles')
test.todo('1 main role')
test.todo('Many main roles')

// -------------------------------------------
// availability
// -------------------------------------------
test.todo('Null availabilities')
test.todo('1 item in availabilities')
test.todo('Many availabilities')
test.todo('Not an array')
test.todo('Not an array of dates')

// -------------------------------------------
// timeZone
// -------------------------------------------
test.todo('timeZone not a string')
test.todo('timeZone is null')
test.todo('Some random timeZone')

// -------------------------------------------
// server
// -------------------------------------------
test.todo('Server not a string')
test.todo('Server is null')
test.todo('Server is not in defined servers')
