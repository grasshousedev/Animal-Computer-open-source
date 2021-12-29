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
const SellerProduct = () => {
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
      .get("/api/v1/getsellerproducts", {
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
                <TableCell>Type</TableCell>
                <TableCell align="left"> Title </TableCell>
                <TableCell align="left"> Price </TableCell>
                <TableCell align="left"> Brand </TableCell>
                <TableCell align="left"> Color </TableCell>
                <TableCell align="left"> Details </TableCell>
                {/* <TableCell align="left"> Total </TableCell>
                <TableCell align="left">Status</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.payload.map((item, i) => (
                <TableRow
                  key={orders.payload[i]._id}
                  id={orders.payload[i]._id}
                  className={classes.noSpace}
                >
                  <TableCell align="left">{item.productType}</TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell align="left">{item.brand}</TableCell>
                  <TableCell align="left">{item.color}</TableCell>
                  <TableCell align="left">{item.processorName} {item.ram} {item.storage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return <Typography variant="body1">You haven't Post Products</Typography>;
    }
  };

  return (
    <>
      <Typography variant="h5" component="h5">
        Your Products
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

export default SellerProduct;
