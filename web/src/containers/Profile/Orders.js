import React, { useState, useEffect } from "react";
import { authStore } from "../../apis/store";
import { orderUserListURL } from "../../constants";

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
import { Button } from "@material-ui/core";
import baseURL from "../../setting";
import axios from "axios";

const Orders = () => {
  // const [callUesEffect, setCallUesEffect] = useState(true)
  const [orders, setOrders] = useState({
    error: null,
    loading: true,
    payload: null,
  });

  useEffect(() => {
    authStore
      .get(orderUserListURL, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setOrders({ ...orders, payload: response.data, loading: false });
      })
      .catch((error) => {
        setOrders({ ...orders, error: error.response, loading: false });
        // console.log(error.response.status);
      });
    //   }, [callUesEffect]);
  }, []);

  const changeStatus = (e) => {
    const elementId = e.target.parentElement.parentElement.parentElement.id;
    axios
      .post(
        `${baseURL}/api/v1/changestatus`,
        {
          orderId: elementId,
        },
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        if (result) {
          e.target.innerText = result.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <TableRow>
                <TableCell> Product </TableCell>
                <TableCell align="left"> Quantity </TableCell>
                <TableCell align="left"> Total </TableCell>
                <TableCell align="left"> Status </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.payload.map((item, i) => (
                <TableRow
                  key={orders.payload[i]._id}
                  id={orders.payload[i]._id}
                >
                  <TableCell align="left">
                    {item.arrayOfCart.map((element) => {
                      return `${element.title}, `;
                    })}
                  </TableCell>
                  <TableCell align="left">
                    {item.arrayOfCart.map((element) => {
                      return `${element.quantity}, `;
                    })}
                  </TableCell>
                  <TableCell align="left">
                    {item.total} $
                    {/* {new Date(item.ordered_date).toLocaleDateString("en-US", {
                                                          day: "numeric",
                                                          month: "short",
                                                          year: "numeric",
                                                          hour: "numeric",
                                                          minute: "numeric",
                                                        })} */}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={changeStatus}
                      //   id={orders.payload[0]._id}
                      //   id={1}
                    >
                      {item.status}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return (
        <Typography variant="body1">
          You haven't ordered anything yet.
        </Typography>
      );
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {renderOrders()}
      </Grid>
    </Grid>
  );
};

export default Orders;
