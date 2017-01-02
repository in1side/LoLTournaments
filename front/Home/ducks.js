'use strict'

import Immutable from 'immutable'

// Actions
const SAVE_TOURNAMENTS = 'app/Home/index/SAVE_TOURNAMENTS'
const DEL_TOURNAMENTS = 'app/HOME/index/DEL_TOURNAMENTS'

// Reducer
const initialState = Immutable.Map({
  tournaments: []
})
export default function HomeReducer (state = initialState, action) {
  switch (action.type) {
    case SAVE_TOURNAMENTS:
      return state.set('tournaments', action.tournaments)
    case DEL_TOURNAMENTS:
      return state.set('tournaments', [])
    default:
      return state
  }
}

// Action Creators
export function saveTournaments (tournaments) {
  return {
    type: SAVE_TOURNAMENTS,
    tournaments
  }
}

export function deleteTournaments () {
  return { type: DEL_TOURNAMENTS }
}
