import { CART_START, CART_SUCCESS, CART_FAIL, CART_CLEAR } from "./types"
import { authStore } from "../../apis/store"
import { orderSummaryURL } from "../../constants"

export const cartStart = () => {
  return {
    type: CART_START,
  }
}

export const cartSuccess = (data) => {
  return {
    type: CART_SUCCESS,
    payload: data,
  }
}

export const cartFail = (error) => {
  return {
    type: CART_FAIL,
    payload: error,
  }
}

export const cartClear = () => {
  return {
    type: CART_CLEAR,
  }
}

export const fetchCart = (data) => {
  return (dispatch) => {
    // dispatch(cartStart())
    // authStore
    //   .get(orderSummaryURL)
    //   .then((res) => {
        dispatch(cartSuccess(data))
      // })
      // .catch((err) => {
      //   dispatch(cartFail(err))
      // })
  }
}

export const clearCart = () => {
  return (dispatch) => {
    dispatch(cartClear())
  }
}
