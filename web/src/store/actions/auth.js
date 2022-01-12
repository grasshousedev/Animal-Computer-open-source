import { store } from "../../apis/store";
import history from "../../history";
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_RESET,
} from "./types";

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    payload: token,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    payload: error,
  };
};

export const authReset = () => {
  return {
    type: AUTH_RESET,
  };
};

export const logout = (location) => {
  store
    .post(
      "api/v1/auth/logout",
      {},
      {
        withCredentials: true,
      }
    )
    .then((res) => {})
    .catch((err) => {});
  history.push("/");
  return {
    type: AUTH_LOGOUT,
  };
};

export const authLogin = (email, password, from) => (dispatch) => {
  dispatch(authStart());
  store
    .post(
      "/api/v1/auth/login",
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      window.scrollTo(0, 0);
      const token = res.data;
      dispatch(authSuccess(token));
      history.push(from);
    })
    .catch((err) => {
      window.scrollTo(0, 0);
      dispatch(authFail(err));
    });
};

export const authSignup =
  (
    email,
    password1,
    password2,
    firstName,
    lastName,
    phoneNumber,
    address,
    from,
    seller
  ) =>
  (dispatch) => {
    dispatch(authStart());
    store
      .post("/api/v1/auth/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        password1: password1,
        password2: password2,
        seller: seller,
      })
      .then((res) => {
        window.scrollTo(0, 0);
        history.push(from);
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        dispatch(authFail(error));
      });
  };

export const authCheckState = () => {
  return (dispatch) => {
    store
      .get("/api/v1/tokenverify", {
        withCredentials: true,
      })
      .then((res) => {
        const token = {
          id: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          address: res.data.address,
          seller: res.data.seller,
        };
        dispatch(authSuccess(token));
      })
      .catch((err) => {});
  };
};
