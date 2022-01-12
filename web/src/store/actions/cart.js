import { CART_START, CART_SUCCESS, CART_FAIL, CART_CLEAR } from "./types";

export const cartStart = () => {
  return {
    type: CART_START,
  };
};

export const cartSuccess = (data) => {
  return {
    type: CART_SUCCESS,
    payload: data,
  };
};

export const cartFail = (error) => {
  return {
    type: CART_FAIL,
    payload: error,
  };
};

export const cartClear = () => {
  return {
    type: CART_CLEAR,
  };
};

export const fetchCart = (data) => {
  return (dispatch) => {
    dispatch(cartSuccess(data));
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch(cartClear());
  };
};
