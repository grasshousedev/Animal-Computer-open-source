import React, { useState, useEffect } from "react";
// import { authStore } from "../../apis/store";
// import { userDetailsURL } from "../../constants";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

// import Edit from "./Edit";
// import Account from "./Account";
// import Orders from "./Orders";
// import Address from "./Address";
// import Password from "./Password";
// import ProfileList from "../Profile/ProfileList";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import Lists from "./Lists";
import BuyerOrders from "./BuyerOrders";
import LaptopForm from "./LaptopForm/LaptopForm";
import SellerProduct from "./SellerProduct";

const useStyles = makeStyles((theme) => ({
  div: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    width: "100%",
  },
  list: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function UserProfile() {
  const token = useSelector((state) => state.auth.token);

  const [state, setState] = useState({
    option: "loading",
    display: "Loading",
    error: null,
    user: null,
  });

  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    // const getUser = () => {
    //   authStore
    //     .get(userDetailsURL)
    //     .then((response) => {
    //       setState({
    //         option: "account",
    //         display: "Account Details",
    //         user: response.data,
    //       })
    //     })
    //     .catch((error) => setState({ ...state, error: error, option: "error" }))
    // }
    setState({
      option: "buyerOrders",
      display: "Buyer Orders",
      user: token,
    });

    // getUser()
  }, []);

  const renderComponent = () => {
    switch (state.option) {
      case "buyerOrders":
        return (
          <React.Fragment>
            {/* <Account state={state} /> <h1>Buyer Orders</h1> */}
            <BuyerOrders />
          </React.Fragment>
        );
      case "sellLaptop":
        return (
          <React.Fragment>
            {/* <Orders /> <h1>Sell Laptop</h1> */}
            <LaptopForm />
          </React.Fragment>
        );
      case "sellAccessories":
        return (
          <React.Fragment>
            {/* <Edit state={state} setState={setState} /> */}{" "}
            <Typography variant="h5" component="h5">
              Sell Accessories
            </Typography>
          </React.Fragment>
        );

      case "sellerProduct":
        return (
          <React.Fragment>
            {/* <Password state={state} /> <h1>Your Products</h1> */}
            <SellerProduct />
          </React.Fragment>
        );
      case "loading":
        return (
          <React.Fragment>
            <Typography variant="body1">Loading</Typography>
            <CircularProgress color="primary" />
          </React.Fragment>
        );
      case "error":
        return (
          <React.Fragment>
            <Typography component="p" variant="body1" color="error">
              An error occurred while fetching user details!
            </Typography>
          </React.Fragment>
        );
      default:
        throw new Error("Unknown address");
    }
  };

  return (
    <React.Fragment>
      <Container style={{ minHeight: "100vh", backgroundColor: "white" }}>
        <CssBaseline />
        <Grid container>
          <Grid container item sm={12} justify="flex-start">
            <Box component="div" mb={5} textAlign="left">
              <Typography variant="h2" component="h2">
                Seller / {state.display}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={4}>
            <List
              component="nav"
              aria-label="account action list"
              disablePadding
              className={classes.list}
            >
              <Lists state={state} setState={setState} />
            </List>
          </Grid>
          <Grid container item sm={12} md={8} justify="center">
            <Box component="div" className={classes.div}>
              {renderComponent()}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
