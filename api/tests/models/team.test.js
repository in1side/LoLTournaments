'use strict'

import test from 'ava'

// -------------------------------------------
// Name
// -------------------------------------------
test.todo('Null name')
test.todo('Empty string team name')
test.todo('Only, numbers, letters, underscores and dashes')
test.todo('More than 255 char name')
test.todo('Weird symbols, quotes, numbers and letters')

// -------------------------------------------
// Members
// -------------------------------------------
test.todo('Null members')
test.todo('Not given array')
test.todo('Not an array of UUID\'s')
test.todo('0 members')
test.todo('1 member')
test.todo('10 members')

// -------------------------------------------
// Desired Roles
// -------------------------------------------
test.todo('Null desiredRoles')
test.todo('None of the defined roles')
test.todo('All defined roles')
test.todo('Null role')
test.todo('Empty string role')
test.todo('Not an array')
test.todo('Not an array of strings')
test.todo('More than 255 char name')

// -------------------------------------------
// Leader
// -------------------------------------------
test.todo('Null leader')
test.todo('Not given UUID for leader')
