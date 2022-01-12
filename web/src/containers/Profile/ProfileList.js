import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "black",
  },
  [theme.breakpoints.up("md")]: {
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    linkText: {
      textDecoration: "none",
      textTransform: "uppercase",
      color: "black",
    },
  },
}));

const ProfileList = ({ state, setState }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() =>
          setState({ ...state, option: "account", display: "Account Details" })
        }
      >
        <ListItemText className={classes.linkText} primary="Account Details" />
      </ListItem>
      <ListItem
        button
        onClick={() =>
          setState({ ...state, option: "orders", display: "Orders" })
        }
      >
        <ListItemText className={classes.linkText} primary="Orders" />
      </ListItem>
      <ListItem
        button
        onClick={() =>
          setState({ ...state, option: "edit", display: "Edit Details" })
        }
      >
        <ListItemText className={classes.linkText} primary="Edit Details" />
      </ListItem>
      <ListItem
        button
        onClick={() =>
          setState({ ...state, option: "password", display: "Change Password" })
        }
      >
        <ListItemText className={classes.linkText} primary="Change Password" />
      </ListItem>
    </React.Fragment>
  );
};

export default ProfileList;
