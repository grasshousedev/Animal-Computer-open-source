import React, { useState, useEffect } from "react";
import { authStore } from "../../apis/store";
import { userDetailsURL } from "../../constants";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import Edit from "./Edit";
import Account from "./Account";
import Orders from "./Orders";
import Address from "./Address";
import Password from "./Password";
import ProfileList from "./ProfileList";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";

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
      option: "account",
      display: "Account Details",
      user: token,
    });

    // getUser()
  }, []);

  const renderComponent = () => {
    switch (state.option) {
      case "account":
        return (
          <React.Fragment>
            <Account state={state} />
          </React.Fragment>
        );
      case "orders":
        return (
          <React.Fragment>
            <Orders />
          </React.Fragment>
        );
      case "edit":
        return (
          <React.Fragment>
            <Edit state={state} setState={setState} />
          </React.Fragment>
        );
      case "address":
        return (
          <React.Fragment>
            {/* <Address user={state.user} /> */}
            <Typography variant="h5" component="h5" >We Have Your Address</Typography>
          </React.Fragment>
        );
      case "password":
        return (
          <React.Fragment>
            <Password state={state} />
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
                User Profile / {state.display}
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
              <ProfileList state={state} setState={setState} />
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
