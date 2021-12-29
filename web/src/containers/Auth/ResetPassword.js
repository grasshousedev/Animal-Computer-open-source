import React, { useState } from "react"
import { Link } from "react-router-dom"
import { store } from "../../apis/store"
import { confirmResetURL } from "../../constants"
import { showError } from "../../utils"
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Copyright from "../../components/Copyright"
import CircularProgress from "@material-ui/core/CircularProgress"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"

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
}))

const MyTextField = ({
  label,
  autoFocus,
  autoComplete,
  inputProps,
  type,
  ...props
}) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <TextField
      label={label}
      {...field}
      helperText={errorText}
      error={!!errorText}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      inputProps={inputProps}
      type={type}
      fullWidth
    />
  )
}

const MyCheckbox = ({ label, ...props }) => {
  const [field] = useField(props)
  return (
    <FormControlLabel
      control={<Checkbox color="primary" />}
      label={label}
      {...field}
    />
  )
}

const validationSchema = Yup.object({
  new_password1: Yup.string()
    .required("Required")
    .min(8, "Must be at least 8 characters long")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      "Must have at least one number, one lowercase and one uppercase letter"
    ),
  new_password2: Yup.string().oneOf(
    [Yup.ref("new_password1"), null],
    "Passwords must match"
  ),
})

export default function ResetPassword(props) {
  const classes = useStyles()
  const uid = props.match.params.uid
  const token = props.match.params.token

  const [state, setState] = useState({
    sending: false,
    success: false,
    error: null,
    payload: {
      uid: uid,
      token: token,
      new_password1: "",
      new_password2: "",
      show_password: false,
    },
  })

  const handleTokenSubmit = (values) => {
    setState({
      ...state,
      sending: true,
    })
    store
      .post(confirmResetURL, values)
      .then((response) => {
        setState({
          ...state,
          sending: false,
          success: true,
        })
      })
      .catch((error) => {
        setState({
          ...state,
          sending: false,
          success: false,
          error: error,
        })
      })
  }

  const renderForm = () => {
    if (state.sending === true && state.success === false) {
      return <CircularProgress />
    } else if (state.sending === false && state.success === false) {
      return (
        <React.Fragment>
          {state.error ? (
            <Typography variant="h5" component="p" color="error">
              {showError(state.error)}
            </Typography>
          ) : (
            ""
          )}
          <Typography component="h1" variant="h5">
            Set New Password
          </Typography>
          <Formik
            enableReinitialize
            initialValues={state.payload}
            onSubmit={handleTokenSubmit}
            validateOnChange={true}
            validationSchema={validationSchema}
          >
            {({ values }) => (
              <Form className={classes.form}>
                <MyTextField
                  required
                  id="newPassword1"
                  name="new_password1"
                  label="New Password"
                  type={values.show_password ? "text" : "password"}
                  fullWidth
                />
                <MyTextField
                  required
                  id="newPassword2"
                  name="new_password2"
                  label="New Password (again)"
                  type={values.show_password ? "text" : "password"}
                  fullWidth
                />
                <MyCheckbox name="show_password" label="Show password" />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Send
                </Button>
              </Form>
            )}
          </Formik>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Box p={3}>
            <Typography variant="h5" component="p">
              Password Reset Success!
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signin"
          >
            Sign In
          </Button>
        </React.Fragment>
      )
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {renderForm()}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
