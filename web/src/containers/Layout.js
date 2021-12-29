import React from "react";
// { useEffect, useState }

import { useSelector } from "react-redux";
// useDispatch
import history from "../history";

// import { store, authStore } from "../apis/store";
// import { fetchCart } from "../store/actions/cart";
// import { getCart, emptyCart } from "../cartLocal";
// import { addToCartURL, maintenanceURL } from "../constants";

import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";
import CookieConsent from "../components/CookieConsent";
// import Collapse from "@material-ui/core/Collapse";
// import Alert from "@material-ui/lab/Alert";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    minHeight: "100vh",
    position: "relative",
  },
  contentWrap: {
    height: "100%",
    paddingBottom: "25rem",
    [theme.breakpoints.up("xs")]: {
      paddingBottom: "60rem",
    },
    [theme.breakpoints.up("sm")]: {
      paddingBottom: "40rem",
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: "25rem",
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: "25rem",
    },
    [theme.breakpoints.up("xl")]: {
      paddingBottom: "22.5rem",
    },
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // console.log(token);
  // const token = localStorage.getItem("token")
  // To avoid access to these components if somehow the token gets deleted
  if (window.location === "/account" || window.location === "/checkout") {
    if (!token) {
      history.push("/");
    }
  }
  // const [maintenance, setMaintenance] = useState({
  //   under_maintenance: false,
  // });

  // useEffect(() => {
  //   const ac = new AbortController();
  //   const getMaintenance = () => {
  //     store
  //       .get(maintenanceURL)
  //       .then((response) => {
  //         setMaintenance(response.data.results[0]);
  //       })
  //       .catch((error) => error);
  //   };
  //   getMaintenance();
  //   return () => {
  //     ac.abort();
  //   };
  // }, []);

  // useEffect(() => {
  //   const ac = new AbortController();
  //   let localCart = getCart();
  //   const updateOnlineCart = () => {
  //     const addToCart = (slug, config) => {
  //       authStore
  //         .post(addToCartURL, { slug, config: config ? config.id : null })
  //         .then((res) => res)
  //         .catch((err) => err);
  //     };

  //     // Update online cart here:
  //     localCart.forEach((item) => {
  //       addToCart(item.slug, item.config);
  //     });
  //     emptyCart();
  //     localCart = getCart();
  //     dispatch(fetchCart());
  //   };

  //   if (token) {
  //     dispatch(fetchCart());
  //     if (localCart && localCart.length > 0) {
  //       updateOnlineCart();
  //     }
  //   }

  //   return () => {
  //     ac.abort();
  //   };
  // }, [token]);

  return (
    <div>
      <Nav />
      {/* {maintenance.under_maintenance ? (
        <Collapse in={maintenance.under_maintenance}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setMaintenance(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            The site will be under maintenance from{" "}
            {new Date(maintenance.start_time).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
            {new Date(maintenance.end_time).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Alert>
        </Collapse> */}
      {/* ) : (
        ""
      )} */}
      <div className={classes.pageContainer}>
        <div className={classes.contentWrap}>
          {props.children}
          <CookieConsent />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
