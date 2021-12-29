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
  // localStorage.removeItem("token");
  // localStorage.removeItem("expirationDate");
  store
    .post(
      "api/v1/auth/logout",
      {},
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  history.push("/");
  return {
    type: AUTH_LOGOUT,
  };
};

// Helper function
// export const checkAuthTimeout = (expirationTime) => {
//   return (dispatch) => {
//     setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime * 1000);
//   };
// };

// export const authLogin = (email, password, from, remember) => (dispatch) => {
export const authLogin = (email, password, from) => (dispatch) => {
  // console.log({email,password ,from});
  dispatch(authStart());
  store
    .post(
      "/api/v1/auth/login",
      {
        email: email,
        // username: email, // Because I have setup the backend to use email as a username
        password: password,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      // console.log(res.data);
      const token = res.data;

      dispatch(authSuccess(token));
      // const token = res.data.key;
      // localStorage.setItem("token", token);
      // dispatch(authSuccess(token));
      // if (remember === true) {
      //   localStorage.setItem("remember", true);
      //   const expirationDate = new Date(new Date().getTime() + 1296000000); // 15 days
      //   localStorage.setItem("expirationDate", expirationDate);
      // } else {
      //   const expirationDate = new Date(new Date().getTime() + 3600000); // 1 hour
      //   localStorage.setItem("expirationDate", expirationDate);
      // }
      // dispatch(checkAuthTimeout(3600));

      history.push(from);
    })
    .catch((err) => {
      window.scrollTo(0, 0);
      console.log(err.response.data);
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
        // console.log(res.data);
        // const token = res.data.key;
        // localStorage.setItem("token", token);
        // dispatch(authSuccess(token));
        // if (remember === true) {
        //   localStorage.setItem("remember", true);
        //   const expirationDate = new Date(new Date().getTime() + 1296000000); // 15 days
        //   localStorage.setItem("expirationDate", expirationDate);
        // } else {
        //   const expirationDate = new Date(new Date().getTime() + 3600000); // 1 hour
        //   localStorage.setItem("expirationDate", expirationDate);
        // }

        // dispatch(checkAuthTimeout(3600));
        history.push(from);
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        // console.log(error.response.data);
        dispatch(authFail(error));
        // setTimeout(() => dispatch(authReset()), 3000);
      });
  };

export const authCheckState = () => {
  return (dispatch) => {
    // const token = "add"
    // const token = localStorage.getItem("token");
    // if (token === undefined) {
    //   dispatch(logout());
    // } else {
    //   const expirationDate = new Date(localStorage.getItem("expirationDate"));
    //   const remember = localStorage.getItem("remember");
    //   if (expirationDate <= new Date() && remember === false) {
    //     dispatch(logout());
    //   } else {
    // console.log("hehehe");
    // dispatch(authSuccess(token));
    //     dispatch(
    //       checkAuthTimeout(
    //         (expirationDate.getTime() - new Date().getTime()) / 1000
    //       )
    //     );
    //   }
    // }
    store
      .get("/api/v1/tokenverify", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        const token = {
          id: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          address: res.data.address,
          seller: res.data.seller,
        };
        console.log({ token });
        dispatch(authSuccess(token));
      })
      .catch((err) => {
        // console.log(err.response.data);
        // dispatch(logout());
      });
  };
};

export const socialLogin = (key, from, remember) => (dispatch) => {
  // const token = key;
  // localStorage.setItem("token", token);
  // dispatch(authSuccess(token));
  // if (remember === true) {
  //   localStorage.setItem("remember", true);
  //   const expirationDate = new Date(new Date().getTime() + 1296000000); // 15 days
  //   localStorage.setItem("expirationDate", expirationDate);
  // } else {
  //   localStorage.setItem("remember", true);
  //   const expirationDate = new Date(new Date().getTime() + 3600000); // 1 hour
  //   localStorage.setItem("expirationDate", expirationDate);
  // }
  // dispatch(checkAuthTimeout(3600));
  // history.push(from);
};
