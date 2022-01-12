import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { store } from "../apis/store";
import { contentURL } from "../constants";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
  },
}));

const Terms = (props) => {
  const classes = useStyles();
  const content = props.match.params.content;

  const [terms, setTerms] = useState({
    loading: true,
    data: null,
  });

  useEffect(() => {
    store
      .get(contentURL(content))
      .then((response) => {
        setTerms({
          loading: false,
          data: response.data,
        });
      })
      .catch((error) => {
        setTerms({
          loading: false,
        });
      });
    // eslint-disable-next-line
  }, []);

  const renderTerms = () => {
    if (terms.loading === true) {
      return <CircularProgress />;
    } else {
      return (
        <Container style={{ backgroundColor: "white" }}>
          <div className={classes.mainDiv}>
            <ReactMarkdown children={terms.data ? terms.data.content : ""} />
          </div>
        </Container>
      );
    }
  };

  return (
    <React.Fragment>
      <ScrollToTopOnMount />
      {renderTerms()}
    </React.Fragment>
  );
};

export default Terms;
