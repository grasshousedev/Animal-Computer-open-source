import React, { useState } from "react"

import { authStore } from "../../apis/store"
import { discountURL } from "../../constants"
import CustomAlert from "../Admin/CustomAlert"

import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import CircularProgress from "@material-ui/core/CircularProgress"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import Title from "./Title"
import { Box } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: 300,
  },
  submit: {
    marginTop: theme.spacing(1),
  },
}))

const Discount = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    percentage: 0,
    sending: false,
    sent: false,
    error: false,
    message: "",
  })

  const handleSubmit = () => {
    setState({
      ...state,
      sending: true,
    })
    authStore
      .post(discountURL, { discount: state.percentage })
      .then((response) => {
        setState({
          ...state,
          sending: false,
          sent: true,
          message: response.data.message,
        })
      })
      .catch((error) =>
        setState({
          ...state,
          sending: false,
          error: true,
        })
      )
  }

  const handleChange = (e) => {
    setState({
      ...state,
      percentage: e.target.value,
    })
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    if (state.sent === true) {
      setState({
        ...state,
        sent: false,
      })
    } else if (state.error === true) {
      setState({
        ...state,
        error: false,
      })
    } else {
      setState({
        ...state,
        error: false,
        sent: false,
      })
    }
  }

  return (
    <React.Fragment>
      <Title>Discount</Title>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={state.sent}
        autoHideDuration={6000}
        onClose={handleClose}
        message={state.message}
      >
        <Alert onClose={handleClose} severity="success">
          {state.message}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={state.error}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Failed to apply the discount"
      >
        <Alert onClose={handleClose} severity="error">
          Failed to apply the discount
        </Alert>
      </Snackbar>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            id="discount"
            label="Discount Percentage"
            name="discount"
            onChange={handleChange}
            type="number"
            value={state.percentage}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <Box p={4}>
            <CustomAlert
              button={state.sending ? <CircularProgress /> : "Apply Discount"}
              title="Apply Discount"
              content={`Are you sure you want to apply ${state.percentage}% discount to all the products?`}
              handleProcess={handleSubmit}
            />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Discount
