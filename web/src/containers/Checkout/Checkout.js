import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authStore } from "../../apis/store";
import {
  addressURL,
  addressUpdateURL,
  addressCreateURL,
  checkoutURL,
  userDetailsURL,
} from "../../constants";
import { clearCart } from "../../store/actions/cart";
import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Address from "./Address";
import Payment from "./Payment";
import Review from "./Review";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";

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

// const steps = ["Shipping address", "Payment details", "Review your order"]

export default function Checkout() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [state, setState] = useState({
    error: null,
    loading: false,
    useBilling: true,
    activeStep: 0,
    order: null,
  });
  const [user, setUser] = useState(null);
  const [options, setOptions] = useState(null);
  const [checkoutData, setCheckoutData] = useState({
    selectedBillingAddress: null,
    selectedShippingAddress: null,
    shippingDetail: null,
    billingDetail: null,
  });

  // useEffect(() => {
  //   const getUser = () => {
  //     authStore
  //       .get(userDetailsURL)
  //       .then((response) => setUser(response.data))
  //       .catch((error) => error)
  //   }
  //   const getAddresses = () => {
  //     authStore
  //       .get(addressURL)
  //       .then((response) => {
  //         setOptions(response.data)
  //       })
  //       .catch((error) => error)
  //   }
  //   getAddresses()
  //   getUser()
  // }, [])

  // const handleEdit = (data) => {
  //   return authStore.patch(addressUpdateURL(data.id), data)
  // }

  // const handleCreate = (data) => {
  //   return authStore.post(addressCreateURL, data)
  // }

  // const handleBilling = (data) => {
  //   if (
  //     data.selectedBillingAddress !== null &&
  //     data.selectedBillingAddress !== ""
  //   ) {
  //     return handleEdit(data.billingDetail)
  //   } else {
  //     return handleCreate(data.billingDetail)
  //   }
  // }

  // const checkout = () => {
  //   let payload = {
  //     selectedShippingAddress: null,
  //     selectedBillingAddress: null,
  //     shippingDetail: checkoutData.shippingDetail,
  //     billingDetail: checkoutData.billingDetail,
  //   }

  //   payload.selectedShippingAddress = Cookies.get("shipping")
  //   payload.selectedBillingAddress = Cookies.get("billing")
  //   Cookies.remove("shipping")
  //   Cookies.remove("billing")
  //   authStore
  //     .post(checkoutURL, payload)
  //     .then((response) => {
  //       dispatch(clearCart())
  //       setState({
  //         ...state,
  //         activeStep: 3,
  //         loading: false,
  //         order: response.data,
  //       })
  //     })
  //     .catch((error) =>
  //       setState({
  //         ...state,
  //         activeStep: 3,
  //         loading: false,
  //         error: error,
  //       })
  //     )
  // }

  // const handleSubmit = () => {
  //   setState({
  //     ...state,
  //     activeStep: 3,
  //     loading: true,
  //   })
  //   if (
  //     checkoutData.selectedShippingAddress !== null &&
  //     checkoutData.selectedShippingAddress !== ""
  //   ) {
  //     handleEdit(checkoutData.shippingDetail)
  //       .then((response) => {
  //         Cookies.set("shipping", response.data.id, { expires: 1 })
  //         return handleBilling(checkoutData)
  //       })
  //       .then((response) => {
  //         Cookies.set("billing", response.data.id, { expires: 1 })
  //         checkout()
  //       })
  //       .catch((error) =>
  //         setState({
  //           ...state,
  //           activeStep: 3,
  //           error: error,
  //         })
  //       )
  //   } else {
  //     handleCreate(checkoutData.shippingDetail)
  //       .then((response) => {
  //         Cookies.set("shipping", response.data.id, { expires: 1 })
  //         return handleBilling(checkoutData)
  //       })
  //       .then((response) => {
  //         Cookies.set("billing", response.data.id, { expires: 1 })
  //         checkout()
  //       })
  //       .catch((error) =>
  //         setState({
  //           ...state,
  //           activeStep: 3,
  //           error: error,
  //         })
  //       )
  //   }
  // }

  // const getStepContent = (step) => {
  //   switch (step) {
  //     case 0:
  //       return (
  //         <Address
  //           user={user}
  //           options={options}
  //           checkoutState={state}
  //           setCheckoutState={setState}
  //           checkoutData={checkoutData}
  //           setCheckoutData={setCheckoutData}
  //         />
  //       )
  //     case 1:
  //       return (
  //         <Payment
  //           user={user}
  //           options={options}
  //           checkoutState={state}
  //           setCheckoutState={setState}
  //           checkoutData={checkoutData}
  //           setCheckoutData={setCheckoutData}
  //         />
  //       )
  //     case 2:
  //       return (
  //         <Review
  //           data={checkoutData}
  //           shoppingCart={cart.shoppingCart}
  //           state={state}
  //           setState={setState}
  //           handleSubmit={handleSubmit}
  //         />
  //       )
  //     default:
  //       throw new Error("Unknown step")
  //   }
  // }

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
          {/* <Stepper activeStep={state.activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
          {/* <React.Fragment>
            {state.activeStep === steps.length ? (
              <React.Fragment>
                {state.loading === true ? (
                  <CircularProgress />
                ) : (
                  <React.Fragment>
                    {state.error ? (
                      <React.Fragment>
                        <Typography variant="body1" component="p" color="error">
                          An error occurred during checkout, so your order could
                          not be completed.
                        </Typography>
                        <Link to="/" className={classes.linkText}>
                          <Box p={4}>
                            <Button variant="contained">
                              Continue Shopping
                            </Button>
                          </Box>
                        </Link>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                          Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                          Your order number is #{" "}
                          {state.order ? state.order.id : ""}. We have emailed
                          your order confirmation, and will send you an update
                          when your order has shipped.
                        </Typography>
                        <Link to="/" className={classes.linkText}>
                          <Box p={4}>
                            <Button variant="contained">
                              Continue Shopping
                            </Button>
                          </Box>
                        </Link>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(state.activeStep)}
              </React.Fragment>
            )}
          </React.Fragment> */}
        </Paper>
      </main>
    </React.Fragment>
  );
}
