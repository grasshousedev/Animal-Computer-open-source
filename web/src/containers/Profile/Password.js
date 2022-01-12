import React, { useState } from "react";
import { authStore } from "../../apis/store";
import { changePasswordURL } from "../../constants";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { showError } from "../../utils";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Password = () => {
  const classes = useStyles();

  const [password, setPassword] = useState({
    saving: false,
    success: null,
    error: null,
    message: null,
  });

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const { oldPassword, newPassword1, newPassword2 } = values;
    setPassword({
      ...password,
      saving: true,
    });
    authStore
      .post(
        changePasswordURL,
        {
          old_password: oldPassword,
          new_password1: newPassword1,
          new_password2: newPassword2,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setPassword({
          saving: false,
          success: true,
        });
        setSubmitting(false);
        resetForm();
      })
      .catch((error) => {
        setPassword({
          ...password,
          saving: false,
          success: false,
          error: true,
          message: error,
        });
        setSubmitting(false);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (password.success === true) {
      setPassword({
        ...password,
        success: false,
      });
    } else {
      setPassword({
        ...password,
        error: false,
      });
    }
  };

  const MyTextField = ({ label, autoFocus, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
      <TextField
        {...field}
        label={label}
        autoFocus={autoFocus}
        helperText={errorText}
        error={!!errorText}
        fullWidth
        type="password"
        required
      />
    );
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("Required")
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        "Must have at least one number, one lowercase and one uppercase letter"
      ),
    newPassword1: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("Required")
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        "Must have at least one number, one lowercase and one uppercase letter"
      ),
    newPassword2: Yup.string().oneOf(
      [Yup.ref("newPassword1"), null],
      "Passwords must match"
    ),
  });

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={password.success}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Password changed successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={password.error}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {showError(password.message)}
        </Alert>
      </Snackbar>
      <Formik
        onSubmit={handleSubmit}
        validateOnChange={true}
        validationSchema={validationSchema}
        initialValues={{
          oldPassword: "",
          newPassword1: "",
          newPassword2: "",
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MyTextField name="oldPassword" label="Old Password" required />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  name="newPassword1"
                  label="New Password"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  name="newPassword2"
                  label="New Password (again)"
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
            >
              {password.saving ? <CircularProgress color="primary" /> : "Save"}
            </Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default Password;
