'use strict'

// Actions
const TOGGLE_VIEW = 'app/Teams/inex/TOGGLE_VIEW'
const SET_TABLE_COLS = 'app/Teams/index/SET_TABLE_COLS'
const SET_TEAMS = 'app/Teams/index/SET_TEAMS'
const DEL_TABLE_COLS = 'app/Teams/index/DEL_TABLE_COLS'
const DEL_TEAMS = 'app/Teams/index/DEL_TEAMS'

// Reducer
const homePageIntialState = Immutable.Map({
  isActive: false,
  tableColumns: [],
  teams: []
})

export default function HomePageReducer (state = homePageIntialState, action = {}) {
  switch (action.type) {
    case TOGGLE_VIEW:
      const updatedIsActive = !state.get('isActive')
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
export function toggleView () {
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
