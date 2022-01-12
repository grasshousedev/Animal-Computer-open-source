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

const Lists = ({ state, setState }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() =>
          setState({ ...state, option: "buyerOrders", display: "Buyer Orders" })
        }
      >
        <ListItemText className={classes.linkText} primary="Buyer Orders" />
      </ListItem>
      <ListItem
        button
        onClick={() =>
          setState({ ...state, option: "sellLaptop", display: "Sell Laptop" })
        }
      >
        <ListItemText className={classes.linkText} primary="Sell Laptop" />
      </ListItem>
      <ListItem
        button
        onClick={() =>
          setState({
            ...state,
            option: "sellAccessories",
            display: "Sell Accessories",
          })
        }
      >
        <ListItemText className={classes.linkText} primary="Sell Accessories" />
      </ListItem>
      <ListItem
        button
        onClick={() =>
          setState({
            ...state,
            option: "sellerProduct",
            display: "Seller Product",
          })
        }
      >
        <ListItemText className={classes.linkText} primary="Seller Product" />
      </ListItem>
    </React.Fragment>
  );
};

export default Lists;
