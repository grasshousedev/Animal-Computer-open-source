import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const CookieConsent = () => {
  const [state, setState] = useState({
    visible: false,
    acceptOnScrollPercentage: 25,
  });

  const handleAccept = () => {
    Cookies.set("AlamalConsentCookies", "Given", { expires: 365 });
    setState({
      ...state,
      visible: false,
    });
  };

  const handleScroll = () => {
    const rootNode = document.documentElement || document.body;

    if (rootNode) {
      const percentage =
        (rootNode.scrollTop / (rootNode.scrollHeight - rootNode.clientHeight)) *
        100;

      if (percentage > state.acceptOnScrollPercentage) {
        handleAccept();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (Cookies.get("AlamalConsentCookies") === undefined) {
      setState({
        ...state,
        visible: true,
      });
    }
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, []);

  const action = (
    <Button color="secondary" size="small" key="accept" onClick={handleAccept}>
      Accept
    </Button>
  );

  const message = (
    <React.Fragment>
      <Typography varaint="subtitle1" component="p">
        This site uses cookies to improve the user experience.
      </Typography>
      <Link to="/page/cookies" target="_blank" style={{ color: "white" }}>
        <Typography varaint="subtitle1" component="p">
          Read cookie policy
        </Typography>
      </Link>
    </React.Fragment>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={state.visible}
      message={message}
      action={action}
    />
  );
};

export default CookieConsent;
