import React, { useState, useEffect, useRef } from "react";
import AddressForm from "./AddressForm";
import { useButtonStyles } from "./CheckoutStyles";

import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   listItem: {
//     padding: theme.spacing(1, 0),
//   },
//   total: {
//     fontWeight: 700,
//   },
//   title: {
//     marginTop: theme.spacing(2),
//   },
// }))

export default function Address() {
  //   {
  //   checkoutState,
  //   setCheckoutState,
  //   options,
  //   user,
  //   checkoutData,
  //   setCheckoutData,
  // }
  // const buttonClasses = useButtonStyles();

  // const formRef = useRef(null)
  // const [state, setState] = useState({
  //   error: null,
  //   saving: false,
  //   success: false,
  //   options: null,
  //   formData: {
  //     id: "",
  //     user: "",
  //     first_name: "",
  //     last_name: "",
  //     phone_number: "",
  //     address_type: "Shipping",
  //     street_address: "",
  //     apartment_address: "",
  //     city: "",
  //     state: "",
  //     country: "UAE",
  //     zip: "",
  //     is_default: true,
  //   },
  // })

  // const firstItem = {
  //   id: "",
  //   user: "",
  //   first_name: "",
  //   last_name: "",
  //   phone_number: "",
  //   address_type: "Shipping",
  //   street_address: "",
  //   apartment_address: "",
  //   city: "",
  //   state: "",
  //   country: "Pak",
  //   zip: "",
  //   is_default: true,
  // }

  // useEffect(() => {
  //   if (user) {
  //     setState({
  //       ...state,
  //       formData: {
  //         ...state.formData,
  //         first_name: user.first_name,
  //         last_name: user.last_name,
  //         phone_number: user.phone_number || "",
  //         user: user.id,
  //       },
  //     })
  //   }
  // }, [user])

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   if (options) {
  //     const addresses = options.filter(
  //       (item) => item.address_type === "Shipping"
  //     )
  //     if (!checkoutData.shippingDetail) {
  //       if (addresses && addresses.length >= 1) {
  //         const defaultAddress = addresses.find(
  //           (element) => element.is_default === true
  //         )
  //         if (defaultAddress || defaultAddress !== undefined) {
  //           setState({
  //             ...state,
  //             options: addresses,
  //             formData: {
  //               ...state.formData,
  //               ...defaultAddress,
  //             },
  //           })
  //         } else {
  //           setState({
  //             ...state,
  //             options: addresses,
  //             formData: {
  //               ...state.formData,
  //               ...addresses[0],
  //             },
  //           })
  //         }
  //       }
  //     } else {
  //       setState({
  //         ...state,
  //         options: addresses,
  //         formData: {
  //           ...checkoutData.shippingDetail,
  //         },
  //       })
  //     }
  //   } else {
  //     if (checkoutData.shippingDetail) {
  //       setState({
  //         ...state,
  //         formData: {
  //           ...checkoutData.shippingDetail,
  //         },
  //       })
  //     }
  //   }
  // }, [options])

  // const handleSelect = (e) => {
  //   if (e.target.value === "i") {
  //     setState({
  //       ...state,
  //       formData: {
  //         ...firstItem,
  //       },
  //     })
  //   } else {
  //     const selectedObject = state.options.find(
  //       (obj) => obj.id === e.target.value
  //     )
  //     setState({
  //       ...state,
  //       formData: {
  //         ...selectedObject,
  //       },
  //     })
  //   }
  // }

  // const handleCheckout = (data) => {
  //   if (checkoutState.useBilling === true) {
  //     let billingData = {
  //       ...data,
  //       id: "",
  //       address_type: "Billing",
  //     }
  //     setCheckoutData({
  //       ...checkoutData,
  //       shippingDetail: data,
  //       billingDetail: billingData,
  //       selectedShippingAddress: data.id,
  //     })
  //   } else {
  //     setCheckoutData({
  //       ...checkoutData,
  //       shippingDetail: data,
  //       selectedShippingAddress: data.id,
  //     })
  //   }
  // }

  // const handleNext = () => {
  //   const values = formRef.current.submitForm()
  //   values.then((response) => {
  //     handleCheckout(response)
  //     setCheckoutState({
  //       ...checkoutState,
  //       activeStep: checkoutState.activeStep + 1,
  //     })
  //   })
  // }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AddressForm />
        </Grid>
      </Grid>
      {/* <List disablePadding>
          {products.map((product) => (
            <ListItem className={classes.listItem} key={product.id}>
              <ListItemText
                primary={<React.Fragment>{product.item.title}</React.Fragment>}
              />
              <Typography variant="body2">
                {product.quantity} x {getPrice(product)} AED
              </Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" className={classes.total}>
                  Shipping
                </Typography>
              }
            />
            <Typography variant="subtitle1">{shipping} AED</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" className={classes.total}>
                  Total
                </Typography>
              }
            />
            <Typography variant="subtitle1">{total} AED</Typography>
          </ListItem>
        </List> 
       <Grid item xs={12}>
        <Typography variant="body1" component="p" color="primary">
          An error occurred while fetching addresses
        </Typography>
      </Grid> 
      <Typography variant="h6" gutterBottom>
        Address
      </Typography> 
      <Grid container spacing={3}>
        {/* {state.error && (
          <Typography variant="body1" component="p" color="error">
            An error occurred while fetching addresses.
          </Typography>
        )} 
        {state.options && state.options.length > 0 ? (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel shrink id="select-address">
                Saved Addresses
              </InputLabel>
              <Select
                labelId="select-address"
                value={state.formData.id}
                onChange={handleSelect}
              >
                <MenuItem key={"" + Math.random()} value={"i"}>
                  Create New
                </MenuItem>
                {state.options.map((address) => {
                  return (
                    <MenuItem key={address.id} value={address.id}>
                      {address.street_address}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          ""
        )} 
        <Grid item xs={12}>
          {/* <AddressForm address={state.formData} formRef={formRef} /> 
          <AddressForm />
        </Grid>
         <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="use_billing"
                checked={
                  checkoutState.useBilling ? checkoutState.useBilling : false
                }
              />
            }
            label="Use the same address for billing?"
            onChange={() => {
              setCheckoutState({
                ...checkoutState,
                useBilling: !checkoutState.useBilling,
              })
            }}
          />
        </Grid> 
        <Grid item xs={12}></Grid> 
         <Grid item xs={12}>
          <div className={buttonClasses.buttons}>
            <Button
              // onClick={handleNext}
              variant="contained"
              color="primary"
              className={buttonClasses.button}
            >
              submit
            </Button>
          </div>
        </Grid> 
      </Grid>*/}
    </React.Fragment>
  );
}
