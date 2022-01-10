import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { store, productApi } from "../../apis/store";
import {
  brandsURL,
  specialURL,
  filterURL,
  processorsURL,
  displaysURL,
  categoriesURL,
} from "../../constants";
import ProductCard from "./ProductCard";
import _ from "lodash";
import ScrollToTopOnMount from "../ScrollToTopOnMount";

import MyList from "../MyList";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import BreadCrumbs from "../BreadCrumbs";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, FormControl, InputLabel, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  // console.log(product_type)
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

  const [page, setPage] = useState(1);

  // const fetchItems = (url) => {
  //   let products = null
  //   let count = 1
  //   let next = null
  //   let previous = null
  //   setState({ ...state, loading: true })
  //   store
  //     .get(url, {
  //       params: {
  //         ordering: state.sort,
  //       },
  //     })
  //     .then((response) => {
  //       products = response.data.results
  //       count = Math.round(response.data.count / 10)
  //       next = response.data.next
  //       previous = response.data.previous
  //       setState({
  //         ...state,
  //         products: products,
  //         count: count,
  //         next: next,
  //         previous: previous,
  //         loading: false,
  //       })
  //     })
  //     .catch((error) => setState({ ...state, loading: false }))
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
    const ac = new AbortController();

    let brands = null;
    let processors = null;
    let displays = null;
    let categories = null;

    // const getLaptopFilters = () => {
    //   store
    //     .get(brandsURL(product_type))
    //     .then((response) => {
    //       brands = response.data.brands;
    //       processors = [];
    //       displays = [];

    //       return store.get(processorsURL);
    //     })
    //     .then((response) => {
    //       for (let item in response.data) {
    //         processors.push(response.data[item].name);
    //       }
    //       return store.get(displaysURL);
    //     })
    //     .then((response) => {
    //       for (let item in response.data) {
    //         displays.push(response.data[item].name);
    //       }
    //       return store.get(specialURL, {
    //         params: {
    //           product_type: product_type,
    //           ordering: state.sort,
    //         },
    //       });
    //     })
    //     .then((response) => {
    //       let products = response.data.results;
    //       let count = Math.round(response.data.count / 10);
    //       let next = response.data.next;
    //       let previous = response.data.previous;

    //       setState({
    //         ...state,
    //         products: products,
    //         count: count,
    //         next: next,
    //         previous: previous,
    //         loading: false,
    //         list: {
    //           brands: brands,
    //           processors: processors,
    //           screenSizes: displays,
    //         },
    //       });
    //     })
    //     .catch((error) => {
    //       setState({
    //         ...state,
    //         loading: false,
    //       });
    //     });
    // };

    // const getAccessoryFilters = () => {
    //   store
    //     .get(brandsURL(product_type))
    //     .then((response) => {
    //       brands = response.data.brands;
    //       categories = [];
    //       return store.get(categoriesURL);
    //     })
    //     .then((response) => {
    //       for (let item in response.data) {
    //         categories.push(response.data[item].name);
    //       }
    //       return store.get(specialURL, {
    //         params: {
    //           product_type: product_type,
    //           ordering: state.sort,
    //         },
    //       });
    //     })
    //     .then((response) => {
    //       let products = response.data.results;
    //       let count = Math.round(response.data.count / 10);
    //       let next = response.data.next;
    //       let previous = response.data.previous;

    //       setState({
    //         ...state,
    //         products: products,
    //         count: count,
    //         next: next,
    //         previous: previous,
    //         loading: false,
    //         list: {
    //           ...state.list,
    //           brands: brands,
    //           categories: categories,
    //         },
    //       });
    //     })
    //     .catch((error) => {
    //       setState({
    //         ...state,
    //         loading: false,
    //       });
    //     });
    // };

    // if (product_type === "Laptop") {
    //   getLaptopFilters();
    // } else {
    //   getAccessoryFilters();
    // }

    return () => {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();

    const getSpecialProducts = () => {
      store
        // .get(specialURL, {
        .get("/api/v1/params/products", {
          params: {
            product_type: product_type,
            // ordering: state.sort,
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

    // const getProducts = () => {
    //   let products = null
    //   let count = 1
    //   let next = null
    //   let previous = null
    //   if (Object.keys(state.filters).length > 0) {
    //     let params = {
    //       processors: [],
    //       screenSizes: [],
    //       categories: [],
    //       brands: [],
    //     }
    //     for (const key in state.filters) {
    //       if (state.filters[key] !== false) {
    //         if (product_type === "Laptop") {
    //           if (state.list.processors.includes(key)) {
    //             params.processors.push(key)
    //           } else if (state.list.screenSizes.includes(key)) {
    //             params.screenSizes.push(key)
    //           } else {
    //             params.brands.push(key)
    //           }
    //         } else {
    //           if (state.list.categories.includes(key)) {
    //             params.categories.push(key)
    //           } else {
    //             params.brands.push(key)
    //           }
    //         }
    //       } else {
    //         delete state.filters[key]
    //       }
    //     }
    //     setState({
    //       ...state,
    //       loading: true,
    //     })
    //     if (_.isEmpty(state.filters)) {
    //       getSpecialProducts()
    //     } else {
    //       productApi
    //         .get(filterURL, {
    //           params: {
    //             ...params,
    //             ordering: state.sort,
    //           },
    //         })
    //         .then((response) => {
    //           products = response.data.results
    //           count = Math.round(response.data.count / 10)
    //           next = response.data.next
    //           previous = response.data.previous
    //           setState({
    //             ...state,
    //             products: products,
    //             count: count,
    //             next: next,
    //             previous: previous,
    //             loading: false,
    //           })
    //         })
    //         .catch((error) => setState({ ...state, loading: false }))
    //     }
    //   } else {
    //     getSpecialProducts()
    //   }
    // }

    // getProducts()

    return () => {
      ac.abort();
    };
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

  // const handleChange = (event, value) => {
  //   if (value > page) {
  //     setPage(value)
  //     fetchItems(state.next)
  //   } else if (value < page) {
  //     setPage(value)
  //     fetchItems(state.previous)
  //   } else {
  //     event.preventDefault()
  //   }
  // }

  // const handleSort = (event) => {
  //   setState({
  //     ...state,
  //     sort: event.target.value,
  //   })
  // }

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
          {/* <Hidden lgUp>
            <Grid item xs={12}>
              <Button
                className={classes.button}
                variant="contained"
                onClick={() =>
                  setState({ ...state, hideList: !state.hideList })
                }
              >
                Filters
              </Button>
            </Grid>
          </Hidden> */}
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            className={state.hideList ? classes.grid : ""}
          >
            <Box component="div" className={classes.list}>
              {/* <MyList data={state.list} setState={setState} state={state} /> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={9}>
            {state?.products?.length > 0 ? (
              <React.Fragment>
                <Grid container spacing={4} justify="flex-end">
                  {/* <Grid item xs={12} md={6} lg={4}>
                    <FormControl>
                      <InputLabel id="sort-by">Sort By:</InputLabel>
                      <Select
                        labelId="sort-by-label"
                        id="sort-by"
                        value={state.sort}
                        onChange={handleSort}
                      >
                        <MenuItem value="price">Price: Low to High</MenuItem>
                        <MenuItem value="-price">Price: High to Low</MenuItem>
                        <MenuItem value="title">Alphabetically: A - Z</MenuItem>
                        <MenuItem value="-title">
                          Alphabetically: Z - A
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> */}
                </Grid>
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
                {/* {state.count !== 0 ? (
                  <div className={classes.root}>
                    <Pagination
                      count={
                        state.count === state.products.length ? 1 : state.count
                      }
                      shape="rounded"
                      onChange={handleChange}
                      page={page}
                    />
                  </div>
                ) : (
                  ""
                )} */}
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
