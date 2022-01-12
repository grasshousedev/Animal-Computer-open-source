import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import Lists from "./Lists";
import BuyerOrders from "./BuyerOrders";
import LaptopForm from "./LaptopForm/LaptopForm";
import SellerProduct from "./SellerProduct";
import AccessoryForm from "./Accessory/AccessoryForm";

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
    setState({
      option: "buyerOrders",
      display: "Buyer Orders",
      user: token,
    });
    // eslint-disable-next-line()
  }, []);

  const renderComponent = () => {
    switch (state.option) {
      case "buyerOrders":
        return (
          <React.Fragment>
            <BuyerOrders />
          </React.Fragment>
        );
      case "sellLaptop":
        return (
          <React.Fragment>
            <LaptopForm />
          </React.Fragment>
        );
      case "sellAccessories":
        return (
          <React.Fragment>
            <AccessoryForm />
          </React.Fragment>
        );

      case "sellerProduct":
        return (
          <React.Fragment>
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
