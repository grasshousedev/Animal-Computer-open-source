import React, { useEffect, useState } from "react"

import { authStore } from "../../apis/store"
import {
  orderDetailURL,
  orderUpdateURL,
  shipmentCreateURL,
  shipmentDetailURL,
} from "../../constants"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import TextField from "@material-ui/core/TextField"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import Title from "./Title"

import CustomAlert from "./CustomAlert"

const OrderDetail = ({ id, state, setState }) => {
  const [order, setOrder] = useState({
    loading: true,
    error: null,
    data: null,
  })
  const [sent, setSent] = useState({
    status: false,
    message: "",
  })
  const [error, setError] = useState({
    status: false,
    message: "",
  })
  const [form, setForm] = useState({
    saving: false,
    error: null,
    formData: {
      id: "",
      order: id,
      courier_name: "",
      tracking_id: "",
      web_address: "",
    },
  })

  useEffect(() => {
    const ac = new AbortController()
    const getOrderDetail = () => {
      authStore
        .get(orderDetailURL(id))
        .then((response) => {
          const orderData = response.data
          setOrder({
            ...order,
            loading: false,
            data: orderData,
          })
        })
        .catch((error) => {
          setOrder({
            ...order,
            loading: false,
            error: error,
          })
        })
    }
    getOrderDetail()

    return () => {
      ac.abort()
    }
  }, [])

  useEffect(() => {
    const ac = new AbortController()
    const getShipmentDetail = () => {
      authStore
        .get(shipmentDetailURL, {
          params: {
            id: id,
          },
        })
        .then((response) => {
          setForm({
            ...form,
            formData: {
              ...response.data,
            },
          })
        })
        .catch((error) => setForm({ ...form, error: error }))
    }

    getShipmentDetail()
    return () => {
      ac.abort()
    }
  }, [])

  const { formData } = form

  const handleChange = (e) => {
    const { formData } = form
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    }
    setForm({
      ...form,
      formData: updatedFormData,
    })
  }

  const handleSubmit = () => {
    setForm({
      ...form,
      saving: true,
    })
    authStore
      .post(shipmentCreateURL, form.formData)
      .then((response) => {
        setSent({
          status: true,
          message: "Shipment details sent successfully!",
        })
        setForm({
          ...form,
          saving: false,
          formData: {
            ...response.data,
          },
        })
        setOrder({
          ...order,
          data: {
            ...order.data,
            status: "Dispatched",
          },
        })
      })
      .catch((error) => {
        setError({
          status: true,
          message: "Shipment detail creation failed!",
        })
        setForm({
          ...form,
          saving: false,
          error: error,
        })
      })
  }

  const handleComplete = () => {
    setOrder({
      ...order,
      loading: true,
    })
    authStore
      .patch(orderUpdateURL(id), { id: id, status: "Completed" })
      .then((response) => {
        setSent({
          status: true,
          message: "Order status updated successfully!",
        })
        setOrder({
          data: response.data,
          loading: false,
        })
      })
      .catch((error) => {
        setError({
          status: true,
          message: "Order status update failed!",
        })
        setOrder({
          ...order,
          loading: false,
          error: error,
        })
      })
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    if (sent.status === true) {
      setSent({
        message: "",
        status: false,
      })
    } else {
      setError({
        message: "",
        status: false,
      })
    }
  }

  const renderItem = (item) => {
    return (
      <TableRow key={item.id}>
        <TableCell align="left">{item.item.title}</TableCell>
        <TableCell align="left">
          {item.config
            ? `${item.config.ram} RAM + ${item.config.storage}`
            : "N/A"}
        </TableCell>
        <TableCell align="left">{item.quantity}</TableCell>
      </TableRow>
    )
  }

  const renderShipment = () => {
    return (
      <List dense>
        <ListItem>
          <Typography variant="h5" component="h5">
            Courier Details
          </Typography>
        </ListItem>
        <ListItem>
          <TableContainer component={Paper}>
            <Table aria-label="shipment table">
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontWeight: 500 }}>
                    Courier Name:
                  </TableCell>
                  <TableCell align="left">{` ${form.formData.courier_name}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: 500 }}>
                    Tracking Id:
                  </TableCell>
                  <TableCell align="left">
                    {` ${form.formData.tracking_id}`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: 500 }}>
                    Courier Website:
                  </TableCell>
                  <TableCell align="left">{` ${form.formData.web_address}`}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>
      </List>
    )
  }

  const renderForm = () => {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container justify="center" spacing={2}>
          <Grid container item xs={11} alignItems="start" justify="flex-start">
            <Typography
              component="p"
              variant="body1"
              style={{ fontWeight: 600 }}
            >
              Add Shipment Details:
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="courierName"
              name="courier_name"
              label="Courier Name"
              onChange={handleChange}
              fullWidth
              value={formData.courier_name}
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="trackingId"
              name="tracking_id"
              label="Tracking Id"
              onChange={handleChange}
              fullWidth
              value={formData.tracking_id}
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="webAddress"
              name="web_address"
              label="Web Address"
              onChange={handleChange}
              fullWidth
              value={formData.web_address}
            />
          </Grid>
          <Grid item xs={11}>
            {form.saving ? (
              <CircularProgress color="secondary" />
            ) : (
              <CustomAlert
                handleProcess={handleSubmit}
                content={
                  <React.Fragment>
                    <p>Save the following shipment details?</p>
                    {renderShipment()}
                  </React.Fragment>
                }
                button="SAVE"
              />
            )}
          </Grid>
        </Grid>
      </form>
    )
  }
  const renderDetail = () => {
    if (order.loading === true) {
      return <CircularProgress />
    } else if (order.data !== null) {
      return (
        <React.Fragment>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <TableContainer component={Paper}>
                    <Table aria-label="order table">
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ fontWeight: 500 }}>
                            Order No:
                          </TableCell>
                          <TableCell align="left">
                            {` ${order.data.id}`}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: 500 }}>
                            Ordered Date:
                          </TableCell>
                          <TableCell align="left">
                            {` ${new Date(
                              order.data.ordered_date
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}`}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: 500 }}>
                            Username:
                          </TableCell>
                          <TableCell align="left">
                            {` ${order.data.user.first_name} ${order.data.user.last_name}`}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: 500 }}>
                            Status:
                          </TableCell>
                          <TableCell align="left">
                            {order.data.status}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        style={{ fontWeight: 600 }}
                        variant="body1"
                        component="p"
                      >
                        Items:
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <TableContainer component={Paper}>
                    <Table aria-label="items table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell align="left">Config</TableCell>
                          <TableCell align="left">Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.data.items.map((item) => renderItem(item))}
                        <TableRow>
                          <TableCell />
                          <TableCell align="left" style={{ fontWeight: 500 }}>
                            Total Amount:
                          </TableCell>
                          <TableCell align="left">{` ${order.data.total} AED`}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              {form.formData.id !== "" && form.formData.id !== null
                ? renderShipment()
                : renderForm()}
            </Grid>
            {order.data.status === "Dispatched" ? (
              <Grid item xs={12}>
                {order.loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <CustomAlert
                    handleProcess={handleComplete}
                    title="Complete Order"
                    content={<p>Set the order status as complete?</p>}
                    button="COMPLETE ORDER"
                  />
                )}
              </Grid>
            ) : (
              ""
            )}
            <Grid item xs={12}>
              <Button
                fullWidth
                onClick={() => setState({ ...state, tab: "Orders" })}
                variant="contained"
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      )
    } else {
      return <Typography>Error in fetching the data</Typography>
    }
  }

  return (
    <React.Fragment>
      <Title>Order Detail</Title>
      {renderDetail()}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={sent.status}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {sent.message}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={error.status}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {error.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

export default OrderDetail
