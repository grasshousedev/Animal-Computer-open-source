import React, { useState, useEffect } from "react";
import { Formik, Form, useField } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, authReset } from "../../store/actions/auth";
import { Link } from "react-router-dom";
import { showError } from "../../utils";
import * as Yup from "yup";

import Copyright from "../../components/Copyright";
import Google from "./Google";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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

const MyTextfield = ({ label, autoComplete, autoFocus, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      margin="normal"
      fullWidth
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      label={label}
      {...field}
      helperText={errorText}
      error={!!errorText}
      type={type}
      required
    />
  );
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("This must be a valid email")
    .required("Required")
    .max(254, "Can't be more than 254 characters"),
  password: Yup.string()
    .required("Required")
    .min(8, "password should be 8 characters long"),
});

const SignInForm = ({ location }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const status = useSelector((state) => state.auth);
  // This error variable is for google login error
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(authReset());
  }, []);

  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = ({ email, password }) => {
    dispatch(authLogin(email, password, from));
  };
  // const handleSubmit = ({ email, password, remember }) => {
  //   dispatch(authLogin(email, password, from, remember))
  // }

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
            Sign in
          </Typography>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ email: "", password: "" }}
            // initialValues={{ email: "", password: "", remember: "" }}
            validateOnChange={true}
            validationSchema={validationSchema}
          >
            {({ values }) => (
              <Form className={classes.form}>
                <MyTextfield
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                />
                <MyTextfield
                  name="password"
                  label="Password"
                  type={values.show_password ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                />
                <MyCheckbox name="show_password" label="Show password" />
                {/* <MyCheckbox label="Remember me" name="remember" /> */}
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
                    "Sign In"
                  )}
                </Button>
                {/* <Google
                  from={from}
                  remember={values.remember}
                  setError={setError}
                  error={error}
                /> */}
                {error && <FormHelperText error={true}>{error}</FormHelperText>}
                <div className={classes.div}>
                  <Grid container spacing={6}>
                    <Grid item xs>
                      <Link to="/reset-password" variant="body2">
                        {"Forgot password?"}
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Link to="/signup">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default SignInForm;
