import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { authStore } from "../apis/store";
import { userDetailsURL } from "../constants";
import CircularProgress from "@material-ui/core/CircularProgress";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, setState] = useState({
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    authStore
      .get(userDetailsURL)
      .then((response) => {
        setState({
          isAdmin: response.data.is_superuser,
          loading: false,
        });
      })
      .catch((error) => {
        setState({
          isAdmin: false,
          loading: false,
        });
      });
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {state.loading === true && state.isAdmin === false ? (
        <CircularProgress />
      ) : state.loading === false && state.isAdmin === false ? (
        <Redirect to="/" />
      ) : (
        <Route {...rest} render={(props) => <Component {...props} />} />
      )}
    </React.Fragment>
  );
};

export default PrivateRoute;
