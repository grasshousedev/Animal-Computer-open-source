import {
  CART_START,
  CART_SUCCESS,
  CART_FAIL,
  CART_CLEAR,
} from "../actions/types"

const INITIAL_STATE = {
  shoppingCart: null,
  error: null,
  loading: false,
}

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_START:
      return { ...state, error: null, loading: true }
    case CART_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        shoppingCart: action.payload,
      }
    case CART_FAIL:
      return { ...state, error: action.payload, loading: false }
    case CART_CLEAR:
      return INITIAL_STATE
    default:
      return state
  }
}
