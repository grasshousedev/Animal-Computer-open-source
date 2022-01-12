import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.auth.token);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (props.location.pathname === "/checkout") {
          props.location.pathname = "/cart";
        }
        return token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
