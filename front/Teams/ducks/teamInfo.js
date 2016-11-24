'use strict'

// Actions
const TOGGLE_VIEW = 'app/Teams/teamInfo/TOGGLE_VIEW'
const SET_TEAM = 'app/Teams/teamInfo/SET_TEAM'
const DEL_TEAM = 'app/Teams/teamInfo/DEL_TEAM'

// Reducer
const initialState = Immutable.Map({
  isActive: false,
  team: Immutable.Map()
})
export default function TeamInfoReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_VIEW:
      const updatedIsActive = !state.get('isActive')
      return state.set('isActive', updatedIsActive)
    case SET_TEAM:
      return state.set('team', action.team)
    case DEL_TEAM:
      return state.set('team', Immutable.Map())
    default:
      return state
  }
}

// Action Creators
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
