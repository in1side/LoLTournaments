'use strict'

// Actions
const TOGGLE_VIEW = 'app/createTeam/TOGGLE_VIEW'
const SET_TABLE_COLS = 'app/createTeam/SET_TABLE_COLS'
const SET_TEAMS = 'app/createTeam/SET_TEAMS'
const DEL_TABLE_COLS = 'app/createTeam/DEL_TABLE_COLS'
const DEL_TEAMS = 'app/createTeam/DEL_TEAMS'

// Reducer
const intialState = Immutable.Map({
  isActive: false,
  tableColumns: [],
  teams: []
})

export default function CreateTeamReducer (state = intialState, action = {}) {
  switch (action.type) {
    case TOGGLE_VIEW:
      const updatedIsActive = !state.isActive
      return state.set('isActive', updatedIsActive)
    case SET_TABLE_COLS:
      return state.set('tableColumns', action.columns)
    case SET_TEAMS:
      return state.set('teams', action.teams)
    case DEL_TABLE_COLS:
      return state.set('teams', [])
    case DEL_TEAMS:
      return state.set('teams', [])
    default:
      return state
  }
}

// Action Creators
export function toggleViewCreateTeam () {
  return { type: TOGGLE_VIEW }
}

export function setTableColumns (columns) {
  return {
    type: SET_TABLE_COLS,
    columns
  }
}

export function setTeams (teams) {
  return {
    type: SET_TEAMS,
    teams
  }
}

export function deleteTableColumns () {
  return { type: DEL_TABLE_COLS }
}

export function deleteTeams () {
  return { type: DEL_TEAMS }
}
