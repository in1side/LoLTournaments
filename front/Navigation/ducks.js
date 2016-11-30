'use strict'

// Actions
const TOGGLE_NAV = 'app/Navigation/index/TOGGLE_NAV'

// Reducer
export default function NavigationReducer (state = false, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      return !state
    default:
      return state
  }
}

// Action Creators
export function toggleNavigation () {
  return { type: TOGGLE_NAV }
}
