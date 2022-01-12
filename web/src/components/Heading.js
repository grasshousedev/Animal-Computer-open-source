import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: `${theme.spacing(2)}, 0`,
  },
}));

const Heading = ({ text }) => {
  const classes = useStyles();
  return (
    <div className={classes.heading}>
      <Typography variant="h1" component="h2">
        {text}
      </Typography>
    </div>
  );
};

export default Heading;
