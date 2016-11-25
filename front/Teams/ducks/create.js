'use strict'

// Actions
const DEFAULT_STATE = 'app/Teams/create/DEFAULT_STATE'
const TOGGLE_VIEW = 'app/Teams/create/TOGGLE_VIEW'
const SET_NAME = 'app/Teams/create/SET_NAME'
const DEL_NAME = 'app/Teams/create/DEL_NAME'
const TOGGLE_DESIRED_ROLE = 'app/Teams/create/TOGGLE_DESIRED_ROLE'
const RESET_DESIRED_ROLES = 'app/Teams/create/RESET_DESIRED_ROLES'
const SET_ERR_MESSAGE = 'app/Teams/create/SET_ERR_MESSAGE'
const DEL_ERR_MESSAGE = 'app/Teams/create/DEL_ERR_MESSAGE'

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
    case DEFAULT_STATE:
      return createTeamInitialState
    case TOGGLE_VIEW:
      const updatedIsActive = !state.get('isActive')
      return updatedIsActive ? state.set('isActive', updatedIsActive) : createTeamInitialState
    case SET_NAME:
      return state.set('name', action.name)
    case DEL_NAME:
      return state.set('name', '')
    case TOGGLE_DESIRED_ROLE:
      const newRoleSelection = !state.get('desiredRoles').get(action.role)
      const newDesiredRoles = state.get('desiredRoles').set(action.role, newRoleSelection)
      const newState = state.set('desiredRoles', newDesiredRoles)
      return newState
    case RESET_DESIRED_ROLES:
      return state.set('desiredRoles', Immutable.Map({
        ADC: false,
        SUPP: false,
        TOP: false,
        MID: false,
        JUNG: false,
        ANY: false
      }))
    case SET_ERR_MESSAGE:
      return state.set('errorMessage', action.message)
    case DEL_ERR_MESSAGE:
      return state.set('errorMessage', '')
    default:
      return state
  }
}

// Action Creators
export function setCreateTeamToDefaultState () {
  return { type: DEFAULT_STATE }
}

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

export function resetDesiredRoles () {
  return { type: RESET_DESIRED_ROLES }
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
