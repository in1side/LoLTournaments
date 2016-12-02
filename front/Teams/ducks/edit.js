'use strict'

// Actions
const DEFAULT_STATE = 'app/Team/edit/DEFAULT_STATE'
const TOGGLE_VIEW = 'app/Team/edit/TOGGLE_VIEW'
const SET_TEAMS = 'app/Team/edit/SET_TEAMS'
const SELECT_TEAM = 'app/Team/edit/SELECT_TEAM'

// Reducer
const editTeamInitialState = Immutable.Map({
  isActive: false,
  teams: Immutable.List(),
  selectedTeam: Immutable.Map()
})
export default function EditTeamReducer (state = editTeamInitialState, action) {
  switch (action.type) {
    case DEFAULT_STATE:
      return editTeamInitialState
    case TOGGLE_VIEW:
      const updatedIsActive = !state.get('isActive')
      return updatedIsActive ? state.set('isActive', updatedIsActive) : editTeamInitialState
    case SET_TEAMS:
      return state.set('teams', Immutable.List(action.teams))
    case SELECT_TEAM:
      return state.set('selectedTeam', Immutable.Map(action.team))
    default:
      return state
  }
}

// Action Creators
export function setEditTeamToDefaultState () {
  return { type: DEFAULT_STATE }
}

export function toggleView () {
  return { type: TOGGLE_VIEW }
}

export function setTeams (teams) {
  return {
    type: SET_TEAMS,
    teams
  }
}

export function selectTeam (team) {
  return {
    type: SELECT_TEAM,
    team
  }
}
