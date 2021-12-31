import React, { useEffect, useState } from "react"
import { authStore } from "../../apis/store"
import { orderListURL, orderFilterURL } from "../../constants"

import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Title from "./Title"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Pagination from "@material-ui/lab/Pagination"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  row: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  pagination: {
    padding: theme.spacing(2),
  },
  control: {
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
}))

export default function Orders({ state, setState }) {
  const classes = useStyles()
  const [orders, setOrders] = useState({
    loading: true,
    error: null,
    count: 1,
    next: null,
    previous: null,
    items: [],
    status: "All",
  })
  const [page, setPage] = useState(1)

  const getOrders = (url) => {
    authStore
      .get(url, {
        params: {
          status: orders.status,
          orderding: "ordered_date",
        },
      })
      .then((response) => {
        const count = Math.round(response.data.count / 10)
        setOrders({
          ...orders,
          loading: false,
          items: response.data.results,
          count: count,
          next: response.data.next,
          previous: response.data.previous,
        })
      })
      .catch((error) => {
        setOrders({
          ...orders,
          loading: false,
          error: true,
        })
      })
  }

  useEffect(() => {
    const getAllOrders = () => {
      authStore
        .get(orderListURL)
        .then((response) => {
          const count = Math.round(response.data.count / 10)
          setOrders({
            ...orders,
            loading: false,
            items: response.data.results,
            count: count,
            next: response.data.next,
            previous: response.data.previous,
          })
        })
        .catch((error) => {
          setOrders({
            ...orders,
            loading: false,
            error: true,
          })
        })
    }

    if (orders.status === "All") {
      getAllOrders()
    } else {
      getOrders(orderFilterURL)
    }
  }, [orders.status])

  const handleSelectChange = (e) => {
    setOrders({
      ...orders,
      status: e.target.value,
    })
  }

  const handleChange = (event, value) => {
    if (value > page) {
      setPage(value)
      getOrders(orders.next)
    } else if (value < page) {
      setPage(value)
      getOrders(orders.previous)
    } else {
      event.preventDefault()
    }
  }

  const renderOrders = () => {
    if (orders.loading === true) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={5}>
            <CircularProgress />
          </TableCell>
        </TableRow>
      )
    } else if (
      orders.loading === false &&
      orders.items !== null &&
      orders.items.length === 0
    ) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={5}>
            <Typography color="secondary">No orders</Typography>
          </TableCell>
        </TableRow>
      )
    } else if (
      orders.loading === false &&
      orders.items !== null &&
      orders.items.length > 0
    ) {
      return orders.items.map((order) => {
        const date = new Date(order.ordered_date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
        return (
          <TableRow
            key={order.id}
            onClick={() => {
              setState({
                ...state,
                orderId: order.id,
                tab: "OrderDetail",
              })
            }}
            hover
            className={classes.row}
          >
            <TableCell align="left">{order.id}</TableCell>
            <TableCell align="left">{`${order.user.first_name} ${order.user.last_name}`}</TableCell>
            <TableCell align="left">{date}</TableCell>
            <TableCell align="left">{order.total} $</TableCell>
            <TableCell align="left">{order.status}</TableCell>
          </TableRow>
        )
      })
    } else {
      return (
        <Typography color="secondary">
          There was an error retrieving the data
        </Typography>
      )
    }
  }

  return (
    <React.Fragment>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Title>Orders</Title>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.control}>
            <FormControl fullWidth>
              <InputLabel id="order-status-label">Select status: </InputLabel>
              <Select
                labelId="order-status-label"
                id="order-status"
                value={orders.status}
                onChange={handleSelectChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Dispatched">Dispatched</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>Order #</TableCell>
                  <TableCell align="left">Customer</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Amount</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderOrders()}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          {orders.count !== 0 ? (
            <div className={classes.pagination}>
              <Pagination
                count={orders.count}
                shape="rounded"
                onChange={handleChange}
                page={page}
              />
            </div>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
