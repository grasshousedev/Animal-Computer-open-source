import React, { useState, useEffect, useRef } from "react"
import { useButtonStyles } from "./CheckoutStyles"
import AddressForm from "./AddressForm"

import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import Button from "@material-ui/core/Button"
import FormLabel from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"

export default function Payment({
  checkoutState,
  setCheckoutState,
  options,
  user,
  checkoutData,
  setCheckoutData,
}) {
  const buttonClasses = useButtonStyles()
  const formRef = useRef(null)
  const [state, setState] = useState({
    error: null,
    saving: false,
    success: false,
    options: null,
    formData: {
      id: "",
      user: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      address_type: "Billing",
      street_address: "",
      apartment_address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      is_default: true,
    },
  })

  const firstItem = {
    id: "",
    user: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address_type: "Billing",
    street_address: "",
    apartment_address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    is_default: true,
  }

  useEffect(() => {
    if (user) {
      setState({
        ...state,
        formData: {
          ...state.formData,
          first_name: user.first_name,
          last_name: user.last_name,
          phone_number: user.phone_number,
          user: user.id,
        },
      })
    }
  }, [user])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (options) {
      const addresses = options.filter(
        (item) => item.address_type === "Billing"
      )
      if (checkoutData.billingDetail === null) {
        if (addresses && addresses.length >= 1) {
          const defaultAddress = addresses.find(
            (element) => element.is_default === true
          )
          if (defaultAddress) {
            setState({
              ...state,
              options: addresses,
              formData: {
                ...state.formData,
                ...defaultAddress,
              },
            })
          } else {
            setState({
              ...state,
              options: addresses,
              formData: {
                ...state.formData,
                ...addresses[0],
              },
            })
          }
        }
      } else {
        setState({
          ...state,
          options: addresses,
          formData: {
            ...checkoutData.billingDetail,
          },
        })
      }
    } else {
      if (checkoutData.billingDetail) {
        setState({
          ...state,
          formData: {
            ...checkoutData.billingDetail,
          },
        })
      }
    }
  }, [options])

  const handleCheckout = (billingData) => {
    if (checkoutState.useBilling === false) {
      setCheckoutData({
        ...checkoutData,
        billingDetail: billingData,
        selectedBillingAddress: billingData.id,
      })
    }
  }

  const handleSelect = (e) => {
    if (e.target.value === "i") {
      setState({
        ...state,
        formData: {
          ...firstItem,
        },
      })
    } else {
      const selectedObject = state.options.find(
        (obj) => obj.id === e.target.value
      )
      setState({
        ...state,
        formData: {
          ...selectedObject,
        },
      })
    }
  }

  const handleNext = () => {
    if (checkoutState.useBilling === false) {
      let billingData = null
      const values = formRef.current.submitForm()
      values.then((response) => {
        billingData = response
        handleCheckout(billingData)
        setCheckoutState({
          ...checkoutState,
          activeStep: checkoutState.activeStep + 1,
        })
      })
    } else {
      setCheckoutState({
        ...checkoutState,
        activeStep: checkoutState.activeStep + 1,
      })
    }
  }

  const renderPayment = () => {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div
              style={{
                width: "100%",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">Payment Option:</FormLabel>
                <RadioGroup
                  aria-label="paymentOption"
                  name="paymentOption1"
                  value={"cod"}
                >
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Grid>
          {checkoutState.useBilling === true ? (
            ""
          ) : (
            <React.Fragment>
              {state.options && state.options.length > 0 ? (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel shrink id="select-address">
                      Saved Addresses
                    </InputLabel>
                    <Select
                      labelId="select-address"
                      id="select-address-label"
                      value={state.formData.id}
                      onChange={handleSelect}
                    >
                      <MenuItem key={"" + Math.random()} value={"i"}>
                        {"Create New"}
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
                <Typography variant="h6" gutterBottom>
                  Billing Address
                </Typography>
              </Grid>
              {state.error && (
                <Grid item xs={12}>
                  <Typography variant="body1" component="p" color="error">
                    An error occurred while fetching addresses
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <AddressForm address={state.formData} formRef={formRef} />
              </Grid>
            </React.Fragment>
          )}

          <Grid item xs={12}>
            <div className={buttonClasses.buttons}>
              <Button
                onClick={() =>
                  setCheckoutState({
                    ...checkoutState,
                    activeStep: checkoutState.activeStep - 1,
                  })
                }
                className={buttonClasses.button}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                className={buttonClasses.button}
              >
                Next
              </Button>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  return <React.Fragment>{renderPayment()}</React.Fragment>
}
