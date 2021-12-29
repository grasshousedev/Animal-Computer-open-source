import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom"
import { store } from "../apis/store";
import { headersURL } from "../constants";

import Slider from "infinite-react-carousel";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SpecificList from "../components/Product/SpecificList";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
    minHeight: "500px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
  button: {
    position: "absolute",
    top: "80%",
    left: "47%",
  },
  title: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      margin: 0,
      padding: 0,
    },
  },
}));

const Item = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {/* <Link to={props.item.link}> */}
      <img
        width="1600 px"
        height="400 px"
        alt="Product Header"
        src={props.item.imageURL}
        className={classes.image}
      />
      {/* </Link> */}
    </div>
  );
};

const Home = () => {
  const classes = useStyles();
  const [headers, setHeaders] = useState({
    loading: false,
    error: false,
    payload: [],
  });
  useEffect(() => {
    const getHeaders = () => {
      setHeaders({
        ...headers,
        loading: true,
      });
      store
        .get(headersURL, {
          withCredentials: true,
        })
        .then((response) => {
          setHeaders({
            ...headers,
            loading: false,
            payload: response.data,
          });
        })
        .catch((error) => {
          setHeaders({
            ...headers,
            loading: false,
            error: true,
          });
        });
    };
    getHeaders();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <ScrollToTopOnMount />
      <Container maxWidth="lg" style={{ backgroundColor: "white" }}>
        <Grid container>
          <Grid item xs={12}>
            {headers.loading ? (
              <CircularProgress />
            ) : headers.payload && headers.payload.length > 0 ? (
              <Slider autoplay={true} autoplaySpeed={8500} arrows={false} dots>
                {headers.payload.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </Slider>
            ) : (
              "No images Available"
            )}
          </Grid>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h2" component="h2">
              Featured Products
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SpecificList label="Featured" />
          </Grid>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h2" component="h2">
              New Products
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SpecificList label="New" />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Home;
