'use strict'

// Actions
const TOGGLE_VIEW = 'app/Teams/CreateTeam/TOGGLE_VIEW'
const SET_NAME = 'app/Teams/CreateTeam/SET_NAME'
const DEL_NAME = 'app/Teams/CreateTeam/DEL_NAME'
const TOGGLE_DESIRED_ROLE = 'app/Teams/CreateTeam/TOGGLE_DESIRED_ROLE'
const SET_ERR_MESSAGE = 'app/Teams/CreateTeam/SET_ERR_MESSAGE'
const DEL_ERR_MESSAGE = 'app/Teams/CreateTeam/DEL_ERR_MESSAGE'

// Reducers
const createTeamInitialState = Immutable.Map({
  isActive: false,
  name: '',
  desiredRoles: Immutable.Map({
    ADC: false,
    SUPP: false,
    TOP: false,
    MID: false,
    JUNG: false,
    ANY: false
  }),
  errorMessage: ''
})
export default function CreateTeamReducer (state = createTeamInitialState, action) {
  switch (action.type) {
    case TOGGLE_VIEW:
      const updatedIsActive = !state.get('isActive')
      return state.set('isActive', updatedIsActive)
    case SET_NAME:
      return state.set('name', action.name)
    case DEL_NAME:
      return state.set('name', '')
    case TOGGLE_DESIRED_ROLE:
      const newRoleSelection = !state.get('desiredRoles').get(action.role)
      const newDesiredRoles = state.get('desiredRoles').set(action.role, newRoleSelection)
      const newState = state.set('desiredRoles', newDesiredRoles)
      return newState
    case SET_ERR_MESSAGE:
      return state.set('errorMessage', action.message)
    case DEL_ERR_MESSAGE:
      return state.set('errorMessage', '')
    default:
      return state
  }
}

// Action Creators
export function toggleView () {
  return { type: TOGGLE_VIEW }
}

export function setName (name) {
  return {
    type: SET_NAME,
    name
  }
}

export function deleteName (name) {
  return {
    type: DEL_NAME,
    name
  }
}

export function toggleDesiredRole (role) {
  return {
    type: TOGGLE_DESIRED_ROLE,
    role
  }
}

export function setErrorMessage (message) {
  return {
    type: SET_ERR_MESSAGE,
    message
  }
}

export function deleteErrorMessage () {
  return { type: DEL_ERR_MESSAGE }
}
