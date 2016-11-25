'use strict'

// Actions
const DEFAULT_STATE = 'app/Teams/homePage/DEFAULT_STATE'
const TOGGLE_VIEW = 'app/Teams/homePage/TOGGLE_VIEW'
const SET_TABLE_COLS = 'app/Teams/homePage/SET_TABLE_COLS'
const SET_TEAMS = 'app/Teams/homePage/SET_TEAMS'
const APPEND_TO_TEAMS = 'app/Teams/homePage/APPEND_TO_TEAMS'
const DEL_TABLE_COLS = 'app/Teams/homePage/DEL_TABLE_COLS'
const DEL_TEAMS = 'app/Teams/homePage/DEL_TEAMS'

// Reducer
const homePageIntialState = Immutable.Map({
  isActive: false,
  tableColumns: [],
  teams: []
})

export default function HomePageReducer (state = homePageIntialState, action = {}) {
  switch (action.type) {
    case DEFAULT_STATE:
      return homePageIntialState
    case TOGGLE_VIEW:
      const updatedIsActive = !state.get('isActive')
      return updatedIsActive ? state.set('isActive', updatedIsActive) : homePageIntialState
    case SET_TABLE_COLS:
      return state.set('tableColumns', action.columns)
    case SET_TEAMS:
      return state.set('teams', action.teams)
    case APPEND_TO_TEAMS:
      state.get('teams').push(action.team) // Add new team to curret list of teams
      return state
    case DEL_TABLE_COLS:
      return state.set('teams', [])
    case DEL_TEAMS:
      return state.set('teams', [])
    default:
      return state
  }
}

// Action Creators
export function setHomePageToDefaultState () {
  return { type: DEFAULT_STATE }
}

export function toggleViewHomePage () {
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

export function appendToTeam (team) {
  return {
    type: APPEND_TO_TEAMS,
    team
  }
}

export function deleteTableColumns () {
  return { type: DEL_TABLE_COLS }
}

export function deleteTeams () {
  return { type: DEL_TEAMS }
}
