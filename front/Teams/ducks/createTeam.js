'use strict'

// Actions
const TOGGLE_VIEW = 'app/Teams/CreateTeam/TOGGLE_VIEW'

// Reducers
const createTeamInitialState = Immutable.Map({
  isActive: false
})
export default function CreateTeamReducer (state = createTeamInitialState, action) {
  switch (action.type) {
    case TOGGLE_VIEW:
      const updatedIsActive = !state.get('isActive')
      return state.set('isActive', updatedIsActive)
    default:
      return state
  }
}

// Action Creators
export function toggleView () {
  return { type: TOGGLE_VIEW }
}
