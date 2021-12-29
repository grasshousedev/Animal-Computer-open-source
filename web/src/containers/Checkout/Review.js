import React, { useState, useEffect } from "react"
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount"
import Cookies from "js-cookie"

import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { useButtonStyles } from "./CheckoutStyles"

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}))

export default function Review({
  data,
  shoppingCart,
  state,
  setState,
  handleSubmit,
}) {
  const classes = useStyles()
  const buttonClasses = useButtonStyles()
  const [disabled, setDisabled] = useState(false)
  const products = shoppingCart && shoppingCart.items
  const total = shoppingCart && shoppingCart.total
  const shipping = shoppingCart && shoppingCart.shipping_cost
  const shippingAddress = data.shippingDetail
  const billingAddress = data.shippingDetail

  useEffect(() => {
    const checkCookie = () => {
      let cookieEnabled = navigator.cookieEnabled
      if (!cookieEnabled) {
        Cookies.set("Test cookie", 1)
        cookieEnabled = Cookies.get("Test cookie")
        Cookies.remove("Test cookie")
      }

      return cookieEnabled || setDisabled(true)
    }
    checkCookie()
  }, [])

  const handleCheckout = () => {
    handleSubmit()
  }

  const getPrice = (product) => {
    if (product.config) {
      if (product.config.discount_price) {
        return product.config.discount_price
      } else {
        return product.config.price
      }
    } else {
      if (product.item.discount_price) {
        return product.item.discount_price
      } else {
        return product.item.price
      }
    }
  }

  return (
    <React.Fragment>
      <ScrollToTopOnMount />
      {disabled ? (
        <Typography color="error" variant="body1" component="p">
          Please enable cookies to complete the checkout process.
        </Typography>
      ) : (
        ""
      )}
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {products && (
        <List disablePadding>
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
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {shippingAddress.first_name} {shippingAddress.last_name}
          </Typography>
          <Typography gutterBottom>
            {shippingAddress.street_address},{" "}
            {shippingAddress.apartment_address}, {shippingAddress.city},{" "}
            {shippingAddress.state},{shippingAddress.zip},{" "}
            {shippingAddress.country}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Billing
          </Typography>
          <Typography gutterBottom>
            {billingAddress.first_name} {billingAddress.last_name}
          </Typography>
          <Typography gutterBottom>
            {billingAddress.street_address}, {billingAddress.apartment_address},
            {billingAddress.city}, {billingAddress.state}, {billingAddress.zip},
            {billingAddress.country}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={buttonClasses.buttons}>
            <Button
              onClick={() => {
                console.log("Calling this")
                setState({ ...state, activeStep: state.activeStep - 1 })
              }}
              className={buttonClasses.button}
            >
              Back
            </Button>
            <Button
              onClick={handleCheckout}
              variant="contained"
              color="primary"
              className={buttonClasses.button}
              disabled={disabled}
            >
              Checkout
            </Button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
