import React, { useState, useEffect } from "react";
import { authStore } from "../../apis/store";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  noSpace: {
    whiteSpace: "nowrap",
  },
}));
const BuyerOrders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState({
    error: null,
    loading: true,
    payload: null,
  });
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    window.scrollTo(0, 0);
    authStore
      .get("/api/v1/getclientorders", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data);
        setOrders({ ...orders, payload: response.data, loading: false });
      })
      .catch((error) => {
        setOrders({ ...orders, error: error.response, loading: false });
        // console.log(error.response.status);
        // console.log(error);
      });
  }, []);

  const renderOrders = () => {
    if (orders.loading === true) {
      return <CircularProgress />;
    } else if (orders.error && orders.error.status === 500) {
      return (
        <Typography variant="body1">
          There was an error loading the data: ( &nbsp; {orders.error.data}{" "}
        </Typography>
      );
    } else if (orders.payload !== null && orders.payload.length > 0) {
      return (
        <TableContainer component={Paper}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow className={classes.noSpace}>
                <TableCell>Client Name</TableCell>
                <TableCell align="left"> Phone Number </TableCell>
                <TableCell align="left"> Delivery Address </TableCell>
                <TableCell align="left"> Google Pin Location </TableCell>
                <TableCell align="left"> Products </TableCell>
                <TableCell align="left"> Quantity </TableCell>
                <TableCell align="left"> Total </TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.payload.map((item, i) => (
                <TableRow
                  key={orders.payload[i]._id}
                  id={orders.payload[i]._id}
                  className={classes.noSpace}
                >
                  <TableCell align="left">
                    {item.firstName} {item.lastName}
                  </TableCell>
                  <TableCell align="left">{item.phoneNumber}</TableCell>
                  <TableCell align="left">{item.deliveryAddress}</TableCell>
                  <TableCell align="left">{item.googleLocation}</TableCell>

                  <TableCell align="left">
                    {item.arrayOfCart
                      .filter((element) => element.authorId === token.id)
                      .map((params) => `${params.title}, `)}
                  </TableCell>
                  <TableCell align="left">
                    {item.arrayOfCart
                      .filter((element) => element.authorId === token.id)
                      .map((params) => `${params.quantity}, `)}
                  </TableCell>
                  <TableCell align="left">
                    {item.arrayOfCart
                      .filter((element) => element.authorId === token.id)
                      .map((params) => `${params.price} $ `)}
                  </TableCell>
                  <TableCell align="left">
                    <strong>{item.status}</strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return <Typography variant="body1">You haven't got any order</Typography>;
    }
  };

  return (
    <>
      <Typography variant="h5" component="h5">
        Buyer Orders
      </Typography>
      <br />
      <Grid container>
        <Grid item xs={12}>
          {renderOrders()}
        </Grid>
      </Grid>
    </>
  );
};

export default BuyerOrders;
