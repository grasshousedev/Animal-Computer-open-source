import React from "react";
import { useSelector } from "react-redux";
import history from "../history";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";
import CookieConsent from "../components/CookieConsent";
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
  const token = useSelector((state) => state.auth.token);
  if (
    window.location === "/account" ||
    window.location === "/seller" ||
    window.location === "/checkout"
  ) {
    if (!token) {
      history.push("/");
    }
  }

  return (
    <div>
      <Nav />
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
