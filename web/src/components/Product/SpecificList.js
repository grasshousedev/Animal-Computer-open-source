import React, { useEffect, useState } from "react";
import { store } from "../../apis/store";
import { specialURL } from "../../constants";
import ProductCard from "./ProductCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
      marginTop: 0,
    },
  },
  card: {
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
    },
  },
}));

const SpecificList = ({ label }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    loading: true,
    products: [],
  });

  useEffect(() => {
    const getProducts = () => {
      store
        .get(specialURL, {
          params: {
            label: label,
          },
          withCredentials: true,
        })
        .then((response) => {
          setState({
            loading: false,
            products: response.data,
          });
        })
        .catch((error) => {
          setState({
            ...state,
            loading: false,
          });
        });
    };
    getProducts();
    // eslint-disable-next-line
  }, []);

  const generateCards = () => {
    return state.products.map((product) => {
      return (
        <Grid
          key={product._id}
          item
          align="center"
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className={classes.card}
        >
          <ProductCard product={product} />
        </Grid>
      );
    });
  };

  return (
    <React.Fragment>
      {state.products && state.products.length > 0 ? (
        <Grid
          container
          direction="row"
          justify="flex-start"
          spacing={2}
          className={classes.list}
        >
          {state.loading ? <CircularProgress /> : generateCards()}
        </Grid>
      ) : state.loading ? (
        <CircularProgress />
      ) : (
        <Typography variant="h6" component="p">
          No products available
        </Typography>
      )}
    </React.Fragment>
  );
};

export default SpecificList;
