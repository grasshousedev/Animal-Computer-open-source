import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCart, removeCartItem, updateQuantity } from "../cartLocal";
import { authStore } from "../apis/store";
import { fetchCart } from "../store/actions/cart";
import { removeFromCartURL, quantityUpdateURL } from "../constants";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import { showError } from "../utils";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "100%",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "white",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  actions: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  items: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: 60,
    },
  },
  image: {
    maxWidth: 64,
    maxHeight: 64,
  },
}));

const Cart = ({ onDismiss }) => {
  const classes = useStyles();
  let carts = useSelector((state) => state);
  const cart = getCart();
  const [state, setState] = useState({
    error: false,
    message: "",
  });
  const dispatch = useDispatch();
  // const token = localStorage.getItem("token")
  // if (!token) {
  // cart = getCart()
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(cart);
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      error: false,
    });
  };

  const handleRemove = (id) => {
    // if (token) {
    //   authStore
    //     .delete(removeFromCartURL(id))
    //     .then((response) => {
    //       dispatch(fetchCart());
    //     })
    //     .catch((error) => {
    //       setState({
    //         error: true,
    //         message: error,
    //       });
    //     });
    // } else {
    removeCartItem(id);
    dispatch(fetchCart());
    // }
  };

  const renderActions = () => {
    return (
      <div className={classes.actions}>
        <Grid container justify="space-between">
          <Grid item>
            {onDismiss ? (
              <Button onClick={onDismiss} variant="contained" color="default">
                <NavigateBeforeIcon /> Continue Shopping
              </Button>
            ) : (
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="default"
              >
                <NavigateBeforeIcon />
                Continue Shopping
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              color="primary"
            >
              Checkout
              <NavigateNextIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  const quantityUpdate = (slug, config, quantity) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   authStore
    //     .post(quantityUpdateURL, { slug, config, quantity })
    //     .then((res) => {
    //       dispatch(fetchCart());
    //     })
    //     .catch((err) => {
    //       dispatch(fetchCart());
    //       setState({ error: true, message: err });
    //     });
    // } else {
    updateQuantity(slug, config, quantity);
    dispatch(fetchCart());
    // }
  };

  const handleChange = (e, slug, config) => {
    let value = e.target.value;
    quantityUpdate(slug, value, config);
  };

  const getPrice = (quantity, price) => {
    return quantity * price;
  };

  const renderEmpty = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1">The cart is empty.</Typography>
        <Box mt={2}>
          <Link to="/" className={classes.linkText}>
            <Button variant="contained" color="secondary">
              Continue Shopping
            </Button>
          </Link>
        </Box>
      </div>
    );
  };

  // const renderOnlineTable = () => {
  //   return (
  //     <TableContainer>
  //       <Table aria-label="spanning table">
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>Items</TableCell>
  //             <TableCell align="right">Quantity</TableCell>
  //             <TableCell align="right">Price</TableCell>
  //             <TableCell align="right" />
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {cart.shoppingCart.items.map((order_item) => {
  //             return (
  //               <TableRow key={order_item.id}>
  //                 <TableCell className={classes.items}>
  //                   <Hidden smDown>
  //                     <img
  //                       src={order_item.item.images[0].image}
  //                       className={classes.image}
  //                       alt="Product"
  //                     />
  //                     &nbsp; &nbsp; &nbsp;
  //                   </Hidden>
  //                   <div>
  //                     {" "}
  //                     {order_item.item.title}{" "}
  //                     {order_item.config
  //                       ? `${order_item.config.ram} + ${order_item.config.storage}`
  //                       : ""}
  //                   </div>
  //                 </TableCell>
  //                 <TableCell align="right">
  //                   <TextField
  //                     type="number"
  //                     onChange={(e) => {
  //                       const config = order_item.config;
  //                       if (config === null) {
  //                         handleChange(e, order_item.item.slug, config);
  //                       } else {
  //                         handleChange(
  //                           e,
  //                           order_item.item.slug,
  //                           order_item.config.id
  //                         );
  //                       }
  //                     }}
  //                     defaultValue={order_item.quantity}
  //                     size="small"
  //                   />
  //                 </TableCell>
  //                 <TableCell align="right">{order_item.final_price}</TableCell>
  //                 <TableCell align="right">
  //                   <IconButton onClick={(e) => handleRemove(order_item.id)}>
  //                     <ClearIcon />
  //                   </IconButton>
  //                 </TableCell>
  //               </TableRow>
  //             );
  //           })}
  //           <TableRow>
  //             <TableCell align="right" />
  //             <TableCell align="right" style={{ fontWeight: 500 }}>
  //               Shipping
  //             </TableCell>
  //             <TableCell align="right">
  //               {cart.shoppingCart.shipping_cost}
  //             </TableCell>
  //             <TableCell align="right" />
  //           </TableRow>
  //           <TableRow>
  //             <TableCell align="right" />
  //             <TableCell align="right" style={{ fontWeight: 500 }}>
  //               Total
  //             </TableCell>
  //             <TableCell align="right">{cart.shoppingCart.total}</TableCell>
  //             <TableCell align="right" />
  //           </TableRow>
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   );
  // };

  const renderCart = () => {
    // if (cart !== null && cart.shoppingCart !== undefined) {
    //   if (cart.loading === true) {
    //     return <CircularProgress />;
    //   } else if (cart.error) {
    //     return (
    //       <React.Fragment>
    //         {showError(cart.error) === "Not found." ? (
    //           renderEmpty()
    //         ) : (
    //           <Typography variant="body1">{showError(cart.error)}</Typography>
    //         )}
    //       </React.Fragment>
    //     );
    //   } else if (
    //     cart.shoppingCart !== null &&
    //     cart.shoppingCart.items !== null
    //   ) {
    //     if (cart.shoppingCart.items.length === 0) {
    //       return renderEmpty();
    //     }
    //     return (
    //       <React.Fragment>
    //         {renderOnlineTable()}
    //         {renderActions()}
    //       </React.Fragment>
    //     );
    //   } else {
    //     return renderEmpty();
    //   }
    //   // Local cart
    // } else
    if (cart !== null && cart.length > 0) {
      let total = 0;
      cart.forEach((item) => (total += getPrice(item.quantity, item.price)));
      return (
        <React.Fragment>
          <TableContainer>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>Items</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((order_item) => {
                  return (
                    <TableRow key={order_item.id}>
                      <TableCell className={classes.items}>
                        <Hidden smDown>
                          <img
                            src={order_item.image}
                            width="64"
                            height="auto"
                            alt="Product"
                          />
                          &nbsp; &nbsp; &nbsp;
                        </Hidden>
                        <div>
                          {" "}
                          {order_item.title}{" "}
                          {order_item.config
                            ? `${order_item.config.ram} + ${order_item.config.storage}`
                            : ""}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          // type="number"
                          // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          inputProps={{
                            step: 1,
                            min: 1,
                            max: 99999,
                            type: "number",
                          }}
                          onChange={(e) => {
                            let config = order_item.config;
                            if (config) {
                              handleChange(e, order_item.slug, config.id);
                            } else {
                              handleChange(e, order_item.slug, null);
                            }
                          }}
                          defaultValue={order_item.quantity}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">{order_item.price} $</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={(e) => handleRemove(order_item.id)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell align="right" />
                  <TableCell align="right" style={{ fontWeight: 500 }}>
                    Total
                  </TableCell>
                  <TableCell align="right">{total} $</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {renderActions()}
        </React.Fragment>
      );
    } else {
      return renderEmpty();
    }
  };

  return (
    <React.Fragment>
      <ScrollToTopOnMount />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={state.error}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Error removing item"
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {showError(state.message)}
        </Alert>
      </Snackbar>
      <Container>{renderCart()}</Container>
    </React.Fragment>
  );
};

export default Cart;
