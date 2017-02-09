'use strict'

import Immutable from 'immutable'

// Actions
const SAVE_ALL_TOURNAMENTS = 'app/Home/index/SAVE_ALL_TOURNAMENTS'
const DEL_ALL_TOURNAMENTS = 'app/Home/index/DEL_ALL_TOURNAMENTS'
const SAVE_ALL_APPLICATIONS = 'app/Home/index/SAVE_ALL_APPLICATIONS'
const DEL_ALL_APPLICATIONS = 'app/Home/index/DEL_ALL_APPLICATIONS'

// Reducer
const initialState = Immutable.Map({
  tournaments: [],
  applications: []
})
export default function HomeReducer (state = initialState, action) {
  switch (action.type) {
    case SAVE_ALL_TOURNAMENTS:
      return state.set('tournaments', action.tournaments)
    case DEL_ALL_TOURNAMENTS:
      return state.set('tournaments', [])
    case SAVE_ALL_APPLICATIONS:
      return state.set('applications', action.applications)
    case DEL_ALL_APPLICATIONS:
      return state.set('applications', [])
    default:
      return state
  }
}

// Action Creators
export function saveTournaments (tournaments) {
  return {
    type: SAVE_ALL_TOURNAMENTS,
    tournaments
  }
}

export function deleteTournaments () {
  return { type: DEL_ALL_TOURNAMENTS }
}

export function saveApplications (applications) {
  return {
    type: SAVE_ALL_APPLICATIONS,
    applications
  }
}

export function delApplications () {
  return { type: DEL_ALL_APPLICATIONS }
}
