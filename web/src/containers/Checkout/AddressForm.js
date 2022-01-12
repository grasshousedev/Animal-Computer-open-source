import React, { useEffect, useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useButtonStyles } from "./CheckoutStyles";
import { useSelector } from "react-redux";
import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import baseURL from "../../setting";
import axios from "axios";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      label={label}
      helperText={errorText}
      error={!!errorText}
      fullWidth
    />
  );
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("Required")
    .max(100, "Can't be more than 100 characters"),
  lastName: Yup.string()
    .required("Required")
    .max(100, "Can't be more than 100 characters"),
  phoneNumber: Yup.string()
    .required("Required")
    .max(20, "Can't be more than 20 numbers"),
  deliveryAddress: Yup.string()
    .required("Required")
    .max(200, "Can't be more than 200 characters"),
  googleLocation: Yup.string()
    .required("Required")
    .max(200, "Can't be more than 200 characters"),
});
const getPrice = (quantity, price) => {
  return quantity * price;
};

export default function AddressForm() {
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState({
    loading: false,
  });
  const buttonClasses = useButtonStyles();
  const token = useSelector((state) => state.auth.token);

  let total = 0;
  cart.forEach((item) => (total += getPrice(item.quantity, item.price)));

  useEffect(() => {
    const getCart = JSON.parse(localStorage.getItem("cart"));
    setCart(getCart);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (values) => {
    setStatus({ loading: true });
    const {
      deliveryAddress,
      firstName,
      googleLocation,
      lastName,
      phoneNumber,
    } = values;

    axios
      .post(
        `${baseURL}/api/v1/paypal`,
        {
          deliveryAddress: deliveryAddress,
          firstName: firstName,
          googleLocation: googleLocation,
          lastName: lastName,
          phoneNumber: phoneNumber,
          total: total,
          arrayOfCart: cart,
        },
        {
          withCredentials: true,
        }
      )
      .then(async (result) => {
        await localStorage.removeItem("cart");
        const json = await result.data.link;
        window.location.assign(json);
        setStatus({ loading: false });
      })
      .catch((err) => {
        setStatus({ loading: false });
      });
  };

  return (
    <React.Fragment>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={<React.Fragment>{product.title}</React.Fragment>}
            />
            <Typography variant="body2">
              {product.quantity} x {product.price} $
            </Typography>
          </ListItem>
        ))}

        <ListItem>
          <ListItemText
            primary={<Typography variant="subtitle1">Total</Typography>}
          />
          <Typography variant="subtitle1"> {total} $</Typography>
        </ListItem>
      </List>
      <Typography variant="h6" gutterBottom>
        Address
      </Typography>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={true}
        initialValues={{
          firstName: token.firstName,
          lastName: token.lastName,
          phoneNumber: token.phoneNumber,
          deliveryAddress: token.address,
          googleLocation: "",
        }}
      >
        {() => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MyTextField name="firstName" label="First name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name="lastName" label="Last name" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  required
                  name="deliveryAddress"
                  label="Delivery Address"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  name="googleLocation"
                  label="Google Pin Location URL"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className={buttonClasses.buttons}>
                <Button
                  type="submit"
                  color="primary"
                  className={buttonClasses.button}
                  variant="contained"
                  disabled={true}
                  // disabled={status.loading}
                  startIcon={
                    <Avatar
                      src={
                        "https://cdn.dribbble.com/users/1525393/screenshots/6448182/comp_3.gif"
                      }
                    />
                  }
                >
                  {status.loading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    "checkout"
                  )}
                </Button>
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
