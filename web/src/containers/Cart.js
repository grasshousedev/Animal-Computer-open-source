import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCart, removeCartItem, updateQuantity } from "../cartLocal";
import { fetchCart } from "../store/actions/cart";
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
  const cart = getCart();
  const [state, setState] = useState({
    error: false,
    message: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
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
    removeCartItem(id);
    dispatch(fetchCart());
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
    updateQuantity(slug, config, quantity);
    dispatch(fetchCart());
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

  const renderCart = () => {
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
                          inputProps={{
                            step: 1,
                            min: 1,
                            max: 50,
                            type: "number",
                          }}
                          onChange={(e) => {
                            if (e.target.value < 0) {
                              e.target.value = 1;
                            }
                            if (e.target.value > 50) {
                              e.target.value = 50;
                            }
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
