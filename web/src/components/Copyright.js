import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  linkText: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Copyright = () => {
  const classes = useStyles();
  return (
    <div style={{ padding: 10 }}>
      <Typography variant="body2" color="inherit" align="center">
        {"Copyright © "}
        <Link to="/" className={classes.linkText}>
          Alamal Computers
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
};

export default Copyright;
