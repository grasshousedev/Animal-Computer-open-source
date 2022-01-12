import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../../apis/store";
import ProductCard from "./ProductCard";
import _ from "lodash";
import ScrollToTopOnMount from "../ScrollToTopOnMount";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import BreadCrumbs from "../BreadCrumbs";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    "& > *": {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      display: "flex",
      justifyContent: "center",
    },
  },
  [theme.breakpoints.down("md")]: {
    grid: {
      marginTop: theme.spacing(4),
      display: "none",
    },
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  list: {
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(4),
    },
  },
  card: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
    },
  },
  breadcrumbs: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  container: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  },
}));

const ProductList = (props) => {
  const classes = useStyles();
  const product_type = props.match.params.product;
  const [state, setState] = useState({
    products: [],
    count: 1,
    next: null,
    previous: null,
    list: {
      brands: null,
      processors: null,
      screenSizes: null,
      categories: null,
    },
    filters: [],
    hideList: true,
    loading: true,
    sort: "price",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const ac = new AbortController();
    return () => {
      ac.abort();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    const getSpecialProducts = () => {
      store
        .get("/api/v1/params/products", {
          params: {
            product_type: product_type,
          },
        })
        .then((response) => {
          let products = response.data;
          let count = Math.round(response.data.count / 10);
          let next = response.data.next;
          let previous = response.data.previous;

          setState({
            ...state,
            products: products,
            count: count,
            next: next,
            previous: previous,
            loading: false,
          });
        })
        .catch((error) => {
          setState({
            ...state,
            loading: false,
          });
        });
    };
    getSpecialProducts();
    return () => {
      ac.abort();
    };
    // eslint-disable-next-line
  }, [state.filters, state.sort]);

  const generateCards = () => {
    if (state?.products?.length > 0) {
      return state?.products?.map((product) => {
        return (
          <Grid
            key={product._id}
            item
            align="center"
            xs={12}
            sm={6}
            lg={4}
            md={4}
            className={classes.card}
          >
            <ProductCard product={product} />
          </Grid>
        );
      });
    } else {
      return <CircularProgress />;
    }
  };

  const generateHeader = () => {
    const heading =
      product_type.charAt(0).toUpperCase() + product_type.slice(1);

    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2">
            {product_type === "Laptop"
              ? `${heading}s`
              : `${heading.slice(0, 8)}ies`}
          </Typography>
        </Grid>
        <Grid item xs={12} container className={classes.breadcrumbs}>
          <BreadCrumbs>
            <Link to={`/products/${product_type}`}>{heading}</Link>
          </BreadCrumbs>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <ScrollToTopOnMount />
      <Container maxWidth="lg">
        <Box component="div" mb={{ md: 4 }}>
          <Grid container spacing={2}>
            {generateHeader()}
          </Grid>
        </Box>
        <Grid container>
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            className={state.hideList ? classes.grid : ""}
          >
            <Box component="div" className={classes.list}></Box>
          </Grid>
          <Grid item xs={12} md={12} lg={9}>
            {state?.products?.length > 0 ? (
              <React.Fragment>
                <Grid container spacing={4} justify="flex-end"></Grid>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  className={classes.container}
                >
                  {state.loading ? (
                    <Grid item xs={12}>
                      <CircularProgress />
                    </Grid>
                  ) : (
                    generateCards()
                  )}
                </Grid>
              </React.Fragment>
            ) : state.loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="h6" component="p">
                No products available
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default ProductList;
