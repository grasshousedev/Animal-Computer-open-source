import React, { useState, useEffect } from "react";
import { Formik, Form, useField } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authSignup, authReset } from "../../store/actions/auth";
import { Link } from "react-router-dom";
import { showError } from "../../utils";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  div: {
    marginTop: theme.spacing(2),
  },
}));

const MyCheckbox = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControlLabel
      control={<Checkbox color="primary" />}
      label={label}
      {...field}
    />
  );
};

const MyTextField = ({ label, autoComplete, autoFocus, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      margin="normal"
      fullWidth
      label={label}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      {...field}
      helperText={errorText}
      error={!!errorText}
      type={type}
      required
    />
  );
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("Required")
    .max(100, "Can't be more than 100 characters")
    .min(3, "First name should be at least 3 characters long"),
  lastName: Yup.string()
    .required("Required")
    .max(100, "Can't be more than 100 characters")
    .min(3, "Last name should be at least 3 characters long"),
  email: Yup.string()
    .email("This must be a valid email")
    .required("Required")
    .max(254, "Can't be more than 254 characters"),
  phoneNumber: Yup.string()
    .required("Required")
    .min(10, "Phone number should be atleast of 11 numbers "),
  address: Yup.string()
    .required("Required")
    .min(18, "Can't be less than 18 characters"),
  password1: Yup.string()
    .required("Required")
    .min(8, "Must be at least 8 characters long")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      "Must have at least one number, one lowercase and one uppercase letter"
    ),
  password2: Yup.string().oneOf(
    [Yup.ref("password1"), null],
    "Passwords must match"
  ),
});

const SignUpForm = ({ location }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const status = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const { from } = location.state || { from: { pathname: "/signin" } };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(authReset());
  }, []);

  const handleSubmit = ({
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    password1,
    password2,
    seller,
  }) => {
    dispatch(
      authSignup(
        email,
        password1,
        password2,
        firstName,
        lastName,
        phoneNumber,
        address,
        from,
        seller
      )
    );
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {status.error ? (
            <Typography variant="h5" color="error">
              {showError(status.error)}
            </Typography>
          ) : (
            " "
          )}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnChange={true}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              address: "",
              password1: "",
              password2: "",
              seller: false,
            }}
          >
            {({ values }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <MyTextField
                      autoComplete="fname"
                      name="firstName"
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MyTextField
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      type="number"
                      autoComplete="phoneNumber"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField
                      type="text"
                      id="address"
                      label="Your Address"
                      name="address"
                      autoComplete="address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField
                      name="password1"
                      label="Password"
                      type={values.show_password ? "text" : "password"}
                      id="password1"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField
                      name="password2"
                      label="Password(again)"
                      type={values.show_password ? "text" : "password"}
                      id="password2"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MyCheckbox name="show_password" label="Show password" />
                  </Grid>
                  <Grid item xs={12}>
                    <MyCheckbox name="seller" label="Sign up as a seller" />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {status.loading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                {error && <FormHelperText error={true}>{error}</FormHelperText>}
                <div className={classes.div}>
                  <Grid container justify="center">
                    <Grid item>
                      <Link to="/signin">Already have an account? Sign in</Link>
                    </Grid>
                  </Grid>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SignUpForm;
