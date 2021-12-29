import React, { useState, useEffect } from "react"
import { store } from "../../apis/store"
import { resetPasswordURL } from "../../constants"
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

const MyTextField = ({
  label,
  autoFocus,
  autoComplete,
  inputProps,
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
      fullWidth
    />
  )
}
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

export default function Forgot() {
  const classes = useStyles()
  const [state, setState] = useState({
    sending: false,
    sent: false,
    error: null,
    email: "",
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleEmailSubmit = (values) => {
    setState({
      ...state,
      sending: true,
    })
    store
      .post(resetPasswordURL, { email: values.email })
      .then((response) => {
        setState({
          sending: false,
          sent: true,
        })
      })
      .catch((error) => {
        setState({
          ...state,
          error: error,
        })
      })
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Must be a valid email"),
  })

  const renderForm = () => {
    return (
      <React.Fragment>
        <Box p={2}>
          <Typography component="h1" variant="h5">
            Enter Your Email
          </Typography>
        </Box>
        <Formik
          enableReinitialize
          initialValues={{ email: state.email }}
          onSubmit={handleEmailSubmit}
          validateOnChange={true}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <MyTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
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
  }

  const renderElements = () => {
    if (state.sending === false && state.sent === false) {
      return <React.Fragment>{renderForm()}</React.Fragment>
    } else if (state.sending === true && state.sent === false) {
      return <CircularProgress />
    } else if (state.error) {
      return (
        <React.Fragment>
          <Typography variant="h4" component="p" color="error">
            An error occurred while submitting the request
          </Typography>
          {renderForm()}
        </React.Fragment>
      )
    } else {
      return (
        <Typography variant="h5" component="p">
          Password Reset Email sent, check your inbox!
        </Typography>
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
        {renderElements()}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
