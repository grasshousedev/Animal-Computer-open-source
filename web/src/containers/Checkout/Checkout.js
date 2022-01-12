import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Address from "./Address";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  linkText: {
    textDecoration: "none",
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const [user] = useState(null);
  const [options] = useState(null);
  const [state, setState] = useState({
    error: null,
    loading: false,
    useBilling: true,
    activeStep: 0,
    order: null,
  });
  const [checkoutData, setCheckoutData] = useState({
    selectedBillingAddress: null,
    selectedShippingAddress: null,
    shippingDetail: null,
    billingDetail: null,
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <React.Fragment>
            <Address
              user={user}
              options={options}
              checkoutState={state}
              setCheckoutState={setState}
              checkoutData={checkoutData}
              setCheckoutData={setCheckoutData}
            />
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
