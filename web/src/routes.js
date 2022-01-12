import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Hoc from "./Hoc";
import SignIn from "./containers/Auth/SignIn";
import SignUp from "./containers/Auth/SignUp";
import Forgot from "./containers/Auth/Forgot";
import Product from "./components/Product/Product";
import ProductList from "./components/Product/ProductList";
import ResetPassword from "./containers/Auth/ResetPassword";
import Checkout from "./containers/Checkout/Checkout";
import UserProfile from "./containers/Profile/UserProfile";
import CartView from "./containers/CartView";
import Home from "./containers/Home";
import Content from "./containers/Content";
import Layout from "./containers/Layout";
import Error from "./components/Error";
import { useSelector } from "react-redux";
import Seller from "./containers/Seller/Seller";

const BaseRouter = withRouter(({ location }) => {
  const token = useSelector((state) => state.auth.token);
  return (
    <Hoc>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/error" exact component={Error} />
          <Route path="/cart" exact component={CartView} />
          <Route
            path="/products/:product"
            exact
            render={(props) => (
              <ProductList key={props.location.key} {...props} />
            )}
          />
          <Route
            path="/product/:slug"
            exact
            render={(props) => <Product key={props.location.key} {...props} />}
          />
          <Route
            path="/page/:content"
            exact
            render={(props) => <Content key={props.location.key} {...props} />}
          />
          <Route
            path="/reset/:uid/:token"
            exact
            render={(props) => (
              <ResetPassword key={props.location.key} {...props} />
            )}
          />
          <PrivateRoute path="/checkout" exact component={Checkout} />
          <PrivateRoute path="/account" exact component={UserProfile} />
          {!token && (
            <>
              <Route path="/signin" exact component={SignIn} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/reset-password" exact component={Forgot} />
            </>
          )}
          {token?.seller && <Route path="/seller" exact component={Seller} />}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Layout>
    </Hoc>
  );
});

export default BaseRouter;
