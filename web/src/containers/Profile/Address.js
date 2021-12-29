import React, { useState, useEffect, useRef } from "react"
import _ from "lodash"

import { authStore } from "../../apis/store"
import {
  addressURL,
  addressCreateURL,
  addressUpdateURL,
  addressDeleteURL,
} from "../../constants"
import { showError } from "../../utils"
import AddressForm from "../Checkout/AddressForm"

import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import AddressDeleteDialog from "./AddressDeleteDialog"
import IconButton from "@material-ui/core/IconButton"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"

import EditIcon from "@material-ui/icons/Edit"

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Address = ({ user }) => {
  const classes = useStyles()

  const formRef = useRef(null)
  const [state, setState] = useState({
    error: null,
    saving: false,
    success: false,
    edit: false,
    create: false,
    addresses: null,
    formData: {
      id: "",
      user: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number || "",
      address_type: "Shipping",
      street_address: "",
      apartment_address: "",
      city: "",
      state: "",
      country: "UAE",
      zip: "",
      is_default: false,
    },
  })

  const onCreateSubmit = () => {
    const values = formRef.current.submitForm()
    values.then((data) => {
      authStore
        .post(addressCreateURL, data)
        .then((response) => {
          setState({
            ...state,
            success: true,
            saving: false,
            create: false,
          })
        })
        .catch((error) => {
          setState({
            ...state,
            error: error,
          })
        })
    })
  }

  const handleEditAddress = (address) => {
    setState({
      ...state,
      edit: true,
      formData: address,
    })
  }

  const onEditSubmit = () => {
    const values = formRef.current.submitForm()
    values.then((data) => {
      authStore
        .patch(addressUpdateURL(data.id), data)
        .then((response) => {
          setState({
            ...state,
            success: true,
            saving: false,
            edit: false,
          })
        })
        .catch((error) => {
          setState({
            ...state,
            error: error,
          })
        })
    })
  }

  const onDelete = (id) => {
    setState({ ...state, saving: true })
    authStore
      .delete(addressDeleteURL(id))
      .then((response) => {
        setState({ ...state, saving: false })
      })
      .catch((error) => setState({ ...state, saving: false, error: error }))
  }

  const handleChange = (e) => {
    setState({
      ...state,
      formData: {
        ...formRef.current.values,
        address_type: e.target.value,
      },
    })
  }

  useEffect(() => {
    const getAddresses = async () => {
      const response = await authStore.get(addressURL)
      setState({
        ...state,
        addresses: response.data,
      })
    }
    getAddresses()
  }, [state.saving, state.edit, state.create])

  const renderAddress = (item) => {
    return (
      <TableRow key={item.id}>
        <TableCell align="left">{`${item.apartment_address} ${item.street_address}`}</TableCell>
        <TableCell align="left">{item.address_type}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => handleEditAddress(item)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <AddressDeleteDialog onDelete={() => onDelete(item.id)} />
        </TableCell>
      </TableRow>
    )
  }

  const renderComponents = () => {
    if (state.edit === true) {
      return (
        <React.Fragment>
          <Grid item xs={12}>
            <Typography variant="h3">Edit Address</Typography>
            <AddressForm formRef={formRef} address={state.formData} />
            <FormControl component="fieldset">
              <FormLabel componenet="legend" className={classes.formLabel}>
                Address Type
              </FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="address_type"
                value={state.formData.address_type}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Shipping"
                  control={<Radio color="primary" />}
                  label="Shipping"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="Billing"
                  control={<Radio color="primary" />}
                  label="Billing"
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>
            <Button
              fullWidth
              className={classes.submit}
              onClick={onEditSubmit}
              variant="contained"
            >
              Save
            </Button>
          </Grid>
          <Button
            fullWidth
            className={classes.submit}
            onClick={() =>
              setState({
                ...state,
                edit: false,
                formData: {
                  ...state.formData,
                  id: "",
                  address_type: "Shipping",
                  street_address: "",
                  apartment_address: "",
                  city: "",
                  state: "",
                  country: "",
                  zip: "",
                  is_default: false,
                },
              })
            }
            variant="contained"
          >
            Back
          </Button>
        </React.Fragment>
      )
    } else if (state.create === true) {
      return (
        <React.Fragment>
          <Grid item xs={12}>
            <Typography variant="h3">Create Address</Typography>
            <AddressForm formRef={formRef} address={state.formData} />
            <FormControl component="fieldset">
              <FormLabel componenet="legend" className={classes.formLabel}>
                Address Type
              </FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="address_type"
                value={state.formData.address_type}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Shipping"
                  control={<Radio color="primary" />}
                  label="Shipping"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="Billing"
                  control={<Radio color="primary" />}
                  label="Billing"
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>
            <Button
              fullWidth
              className={classes.submit}
              onClick={onCreateSubmit}
              variant="contained"
            >
              Save
            </Button>
          </Grid>
          <Button
            fullWidth
            className={classes.submit}
            onClick={() => setState({ ...state, create: false })}
            variant="contained"
          >
            Back
          </Button>
        </React.Fragment>
      )
    } else if (!_.isEmpty(state.addresses)) {
      return (
        <React.Fragment>
          <Grid item xs={12}>
            {_.isEmpty(state.addresses) ? (
              <CircularProgress />
            ) : (
              <React.Fragment>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell align="left">Address Type</TableCell>
                        <TableCell />
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.addresses.map((item) => renderAddress(item))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </React.Fragment>
            )}
          </Grid>
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            onClick={() => setState({ ...state, create: true })}
          >
            Create a new Address
          </Button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Grid item xs={12}>
            No addresses added yet.
          </Grid>
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            onClick={() => setState({ ...state, create: true })}
          >
            Create a new Address
          </Button>
        </React.Fragment>
      )
    }
  }

  return (
    <Grid container>
      {state.error ? (
        <Grid item xs={12}>
          <Typography variant="body1" component="p" color="error">
            {showError(state.error)}
          </Typography>
        </Grid>
      ) : (
        ""
      )}
      {renderComponents()}
    </Grid>
  )
}

export default Address
