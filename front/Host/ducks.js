'use strict'

import Immutable from 'immutable'

// Actions
const SAVE_HOST_TOURNAMENTS = 'app/Host/index/SAVE_HOST_TOURNAMENTS'
const DEL_HOST_TOURNAMENTS = 'app/Host/index/DEL_HOST_TOURNAMENTS'

// Reducer
const initialState = Immutable.Map({
  tournaments: []
})

export default function HostReducer (state = initialState, action) {
  switch (action.type) {
    case SAVE_HOST_TOURNAMENTS:
      return state.set('tournaments', action.tournaments)
    case DEL_HOST_TOURNAMENTS:
      return state.set('tournaments', [])
    default:
      return state
  }
}

// Action Creators
export function saveHostTournaments (tournaments) {
  return {
    type: SAVE_HOST_TOURNAMENTS,
    tournaments
  }
}

export function deleteHostTournaments (tournaments) {
  return { type: DEL_HOST_TOURNAMENTS }
}
