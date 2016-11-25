'use strict'

// Actions
const DEFAULT_STATE = 'app/Teams/teamInfo/DEFAULT_STATE'
const TOGGLE_VIEW = 'app/Teams/teamInfo/TOGGLE_VIEW'
const SET_TEAM = 'app/Teams/teamInfo/SET_TEAM'
const DEL_TEAM = 'app/Teams/teamInfo/DEL_TEAM'

// Reducer
const teamInfoInitialState = Immutable.Map({
  isActive: false,
  team: Immutable.Map()
})
export default function TeamInfoReducer (state = teamInfoInitialState, action) {
  switch (action.type) {
    case DEFAULT_STATE:
      return teamInfoInitialState
    case TOGGLE_VIEW:
      const updatedIsActive = !state.get('isActive')
      return updatedIsActive ? state.set('isActive', updatedIsActive) : teamInfoInitialState
    case SET_TEAM:
      return state.set('team', action.team)
    case DEL_TEAM:
      return state.set('team', Immutable.Map())
    default:
      return state
  }
}

// Action Creators
export function setTeamInfoToDefaultState () {
  return { type: DEFAULT_STATE }
}

export function toggleViewTeamInfo () {
  return { type: TOGGLE_VIEW }
}

export function setTeam (team) {
  return {
    type: SET_TEAM,
    team
  }
}

export function deleteTeam () {
  return { type: DEL_TEAM }
}
