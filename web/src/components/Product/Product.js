import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { store } from "../../apis/store";
import { createCartItem } from "../../cartLocal";
import BreadCrumbs from "../BreadCrumbs";
import AlertDialog from "./AlertDialog";
import AddedToCart from "./AddedToCart";
import Slider from "infinite-react-carousel";
import history from "../../history";
import Cart from "../../containers/Cart";
import ProductTab from "./Tab";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { CircularProgress } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { showError } from "../../utils";

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: "100%",
    height: "auto",
  },
  slider: {
    maxHeight: "400px",
  },
  discount: {
    textDecoration: "line-through",
    color: theme.palette.grey[600],
  },
  addToCart: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },
}));

export default function Product(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    product: null,
    price: null,
    discountPrice: null,
    option: null,
    error: null,
  });
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialog, setDialog] = useState({
    render: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProduct = () => {
      store
        .get(
          "/api/v1/product",
          {
            params: props.match.params.slug,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data) {
            setState({
              ...state,
              product: response.data,
              option: response.data._id,
              price: response.data.price,
              discountPrice: response.data.discountPrice,
            });
          } else {
            setState({
              ...state,
              product: response.data,
              option: 0,
              price: response.data.price,
              discountPrice: response.data.discountPrice,
            });
            if (response.data.quantity > 0) {
              setDisabled(false);
            }
          }
        })
        .catch((error) => {
          setState({ ...state, error });
        });
    };
    getProduct();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleDisabled = () => {
      if (state?.product?.productType === "Laptop") {
        if (state.option) {
          setDisabled(false);
        }
      }
    };
    handleDisabled();
    // eslint-disable-next-line
  }, [state.option]);

  // Slider
  const generateImages = () => {
    if (state.product.imageURL1) {
      return [
        state.product.imageURL1,
        state.product.imageURL2,
        state.product.imageURL3,
        state.product.imageURL4,
      ].map((image, id) => (
        <img key={id} className={classes.img} src={image} alt="Product" />
      ));
    } else {
      return (
        <img
          className={classes.img}
          src={
            "https://media.istockphoto.com/vectors/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-vector-id1128826884?k=20&m=1128826884&s=170667a&w=0&h=_cx7HW9R4Uc_OLLxg2PcRXno4KERpYLi5vCz-NEyhi0="
          }
          alt="missing product"
        />
      );
    }
  };
  const simpleSlider = () => (
    <Slider dots className={classes.slider}>
      {generateImages()}
    </Slider>
  );

  const generateDetails = () => {
    return (
      <React.Fragment>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="h6">
                Processor:
                <Typography variant="body1" component="span">
                  {` ${state.product.processorName} ${
                    state.product.processorDetail
                      ? state.product.processorDetail
                      : ""
                  }`}
                </Typography>
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="h6">
                Display:
                <Typography variant="body1" component="span">
                  {` ${state.product.display} ${
                    state.product.displayDetails
                      ? state.product.displayDetails
                      : ""
                  }`}
                </Typography>
              </Typography>
            }
          />
        </ListItem>
      </React.Fragment>
    );
  };

  const renderConfigs = () => {
    if (state.product) {
      return (
        <ListItem>
          <FormControl component="fieldset">
            <FormLabel component="legend">Configurations</FormLabel>
            <RadioGroup aria-label="config" name="config" value={state.option}>
              {state.product.ram ? (
                <React.Fragment>
                  <FormControlLabel
                    value={state.option}
                    control={<Radio />}
                    label={`${state.product.ram} RAM + ${state.product.storage} STORAGE`}
                    key={state.option}
                  />
                </React.Fragment>
              ) : (
                "Out of Stock"
              )}
            </RadioGroup>
          </FormControl>
        </ListItem>
      );
    } else {
      return;
    }
  };

  const renderPrice = (discountPrice, price) => {
    return (
      <React.Fragment>
        {discountPrice ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <Typography variant="body1">
              <Box
                fontWeight="fontWeightBold"
                fontSize="1.25rem"
                component="span"
              >
                Price:{" "}
              </Box>{" "}
              {discountPrice} $ &nbsp;
            </Typography>
            <Typography variant="body1" className={classes.discount}>
              {price} $
            </Typography>
          </div>
        ) : (
          <Typography variant="body1" component="p">
            <Box
              fontWeight="fontWeightBold"
              fontSize="1.25rem"
              component="span"
            >
              Price:{" "}
            </Box>
            {price} $
          </Typography>
        )}
      </React.Fragment>
    );
  };

  // Cart Section

  const renderDialog = () => {
    const onCheckout = () => {
      setDialog({
        render: false,
      });
      history.push("/checkout");
    };

    const onDismiss = () => {
      setDialog({
        render: false,
      });
    };
    return (
      <AlertDialog
        content={<Cart onDismiss={onDismiss} />}
        handleDone={onCheckout}
        handleDismiss={onDismiss}
        title={"Cart"}
        action=""
        dismiss=""
      />
    );
  };

  const addToCart = (slug) => {
    createCartItem(state.product, state.option);
    if (window.screen.width > 960) {
      setDialog({
        render: true,
      });
    } else {
      setDialogOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const renderProduct = () => {
    return (
      <React.Fragment>
        <Box py={3}>
          <BreadCrumbs>
            <Link to={`/products/${state.product.productType}`}>
              {state.product.productType.charAt(0).toUpperCase() +
                state.product.productType.slice(1)}
            </Link>
            <Link to={`/product/${props.match.params.slug}`}>
              {state.product.title}
            </Link>
          </BreadCrumbs>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} lg={4}>
            {simpleSlider()}
          </Grid>
          <Grid item xs={12} sm={9} lg={8}>
            <List dense>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="h2" component="h1">
                      {state.product.title} &#40;{state.product.brand}&#41;
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <Rating name="read-only" value={5} readOnly precision={0.5} />
                <span>({5})</span>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={renderPrice(state.discountPrice, state.price)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1" component="p">
                      {state.product.description}
                    </Typography>
                  }
                />
              </ListItem>

              {state.product.color ? (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6">
                        Color:
                        <Typography variant="body1" component="span">
                          {` ${state.product.color}`}
                        </Typography>
                      </Typography>
                    }
                  />
                </ListItem>
              ) : (
                ""
              )}
              {state.product && state.product.productType === "Laptop"
                ? generateDetails()
                : ""}
              {state.product && state.product.productType === "Laptop"
                ? renderConfigs()
                : ""}
              <Divider variant="middle" />
              <ListItem>
                <div className={classes.addToCart}>
                  {state.product.quantity === 0 ? (
                    <Typography variant="subtitle1" component="p">
                      Out of stock
                    </Typography>
                  ) : (
                    ""
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => addToCart(state.option)}
                    disabled={disabled}
                    className={classes.selector}
                  >
                    Add To Cart
                  </Button>
                </div>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        {state.product.productType === "Laptop" ? (
          <Box mt={4}>
            <ProductTab
              productID={state.option}
              productTitle={state.product.title}
              description={state.product.description}
              manufacturer_url={state.product.manufacturer_url}
            />
          </Box>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Container>
        <AddedToCart open={dialogOpen} setOpen={setDialogOpen} />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {showError(state.error)}
          </Alert>
        </Snackbar>
        {dialog.render ? renderDialog() : ""}
        {state.product ? (
          renderProduct()
        ) : state.error ? (
          <Typography varaint="body1" component="p" color="error">
            Error in fetching the data
          </Typography>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </React.Fragment>
  );
}
