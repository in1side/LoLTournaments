'use strict'

// Actions
// TODO: Write separate actions for view all teams and create teams
const TOGGLE_VIEW_CREATE_TEAMS = 'app/createTeams/TOGGLE_VIEW_CREATE_TEAMS'
const SET_TABLE_COLS = 'app/Teams/SET_TABLE_COLS'
const SET_TEAMS = 'app/Teams/SET_TEAMS'
const DEL_TABLE_COLS = 'app/Teams/DEL_TABLE_COLS'
const DEL_TEAMS = 'app/Teams/DEL_TEAMS'

// Reducer
const intialState = Immutable.Map({
  isCreateTeamActive: false,
  tableColumns: [],
  teams: []
})

export default function TeamsReducer (state = intialState, action = {}) {
  switch (action.type) {
    case TOGGLE_VIEW_CREATE_TEAMS:
      const updatedIsActive = !state.get('isCreateTeamActive')
      return state.set('isCreateTeamActive', updatedIsActive)
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
export function toggleViewCreateTeams () {
  return { type: TOGGLE_VIEW_CREATE_TEAMS }
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
