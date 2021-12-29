import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_RESET,
} from "../actions/types"

const INITIAL_STATE = {
  token: null,
  error: null,
  loading: false,
}

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, error: null, loading: true }
    case AUTH_SUCCESS:
      return { ...state, token: action.payload, error: null, loading: false }
    case AUTH_FAIL:
      return { ...state, error: action.payload, loading: false }
    case AUTH_LOGOUT:
      return { ...state, token: null }
    case AUTH_RESET:
      return INITIAL_STATE
    default:
      return state
  }
}
