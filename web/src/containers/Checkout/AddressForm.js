import React, { useEffect, useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useButtonStyles } from "./CheckoutStyles";
import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core";
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

// const MyCheckbox = ({ label, ...props }) => {
//   const [field] = useField(props);
//   return (
//     <FormControlLabel
//       control={<Checkbox defaultChecked color="secondary" />}
//       label={label}
//       {...field}
//     />
//   );
// };

// const MySelect = ({ label, ...props }) => {
//   const [field] = useField(props);
//   return (
//     <FormControl fullWidth>
//       <InputLabel id="country">{label}</InputLabel>
//       <Select labelId="country" {...field}>
//         <MenuItem value={"Pakistan"}>Pakistan</MenuItem>
//       </Select>
//     </FormControl>
//   );
// };

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

// export default function AddressForm({ address, formRef }) {
export default function AddressForm() {
  const [cart, setCart] = useState([]);
  const buttonClasses = useButtonStyles();
  // const dispatch = useDispatch(function)
  const token = useSelector((state) => state.auth.token);
  const check = useSelector((state) => state);
  // console.log(token);

  let total = 0;
  cart.forEach((item) => (total += getPrice(item.quantity, item.price)));

  useEffect(() => {
    const getCart = JSON.parse(localStorage.getItem("cart"));
    setCart(getCart);
    // console.log(cart);
  }, []);
  // console.log(check);

  const handleSubmit = (values) => {
    // console.log(values);
    const {
      deliveryAddress,
      firstName,
      googleLocation,
      lastName,
      phoneNumber,
    } = values;
    // var obj = {};
    // console.log(cart);
    // cart.map((element, i) => {
      // console.log(element.authorI);
      // obj[element.authorId] = element.authorId;
      // console.log(obj);
    // });
    axios
      .post(
        `${baseURL}/api/v1/post/order`,
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
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // alert(JSON.stringify(values));
    // console.log(total);
    axios
      .post(
        `${baseURL}/api/v1/paypal`,
        {
          price: total,
        },
        {
          withCredentials: true,
        }
      )
      .then(async (result) => {
        // console.log(result);
        if (result) {
          console.log(result);
          await localStorage.removeItem("cart")
          const json = await result.data.link;
          window.location.assign(json);
        }
      })
      .catch((err) => {
        console.log(err);
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
          {/* <Typography variant="subtitle1">{total} AED</Typography> */}
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
        // innerRef={formRef}
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
              {/* <Grid item xs={12} sm={6}>
                <MyTextField name="city" label="City" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MySelect
                  name="country"
                  label="Country"
                  autoComplete="shipping country"
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <MyCheckbox
                  name="is_default"
                  label="Set this address as default?"
                />
              </Grid> */}
            </Grid>
            <Grid item xs={12}>
              <div className={buttonClasses.buttons}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={buttonClasses.button}
                >
                  submit
                </Button>
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
