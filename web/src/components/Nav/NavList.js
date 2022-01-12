import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/auth";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import LogoutAlertDialog from "../LogoutAlertDialog";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { clearCart } from "../../store/actions/cart";

const useStyles = makeStyles((theme) => ({
  navDisplayFlex: {
    display: "flex",
    justifyContent: "flex-start",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "white",
  },
  [theme.breakpoints.down("md")]: {
    navDisplayFlex: {
      display: "flex",
      flexDirection: "column",
    },
  },
}));

const NavList = ({ cart }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth);
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout(window.location.pathname));
  };

  const handleLogoutClick = (e) => {
    e.stopPropagation();
  };

  const signedOut = () => {
    return (
      <React.Fragment>
        <Hidden mdUp>
          <Link to="/" className={classes.linkText}>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
        </Hidden>
        <Link to="/products/Laptop" className={classes.linkText}>
          <ListItem button>
            <ListItemText primary="Laptops" />
          </ListItem>
        </Link>
        <Link to="/products/Accessory" className={classes.linkText}>
          <ListItem button>
            <ListItemText primary="Accessories" />
          </ListItem>
        </Link>
        <Link to="/signin" className={classes.linkText}>
          <ListItem button>
            <ListItemText primary="Sign In" />
          </ListItem>
        </Link>
        <Hidden mdUp>
          <Link to="/signup" className={classes.linkText}>
            <ListItem button>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </Link>
        </Hidden>
        <Hidden mdDown>
          <Link to="/cart" className={classes.linkText}>
            <ListItem button>
              <ListItemIcon>
                <Badge
                  badgeContent={cart ? cart.length : null}
                  color="secondary"
                >
                  <ShoppingCartOutlinedIcon style={{ color: "white" }} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItem>
          </Link>
        </Hidden>
      </React.Fragment>
    );
  };

  const signedIn = () => {
    return (
      <React.Fragment>
        <Hidden mdUp>
          <ListItem button component={Link} to="/" className={classes.linkText}>
            <ListItemText primary="Home" />
          </ListItem>
        </Hidden>
        <ListItem
          button
          component={Link}
          to="/products/Laptop"
          className={classes.linkText}
        >
          <ListItemText primary="Laptops" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/products/Accessory"
          className={classes.linkText}
        >
          <ListItemText primary="Accessories" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/account"
          className={classes.linkText}
        >
          <ListItemText primary={status?.token?.firstName.substr(0, 8)} />
        </ListItem>
        {token?.seller && (
          <ListItem
            button
            component={Link}
            to="/seller"
            className={classes.linkText}
          >
            <ListItemText primary="Seller" />
          </ListItem>
        )}
        <LogoutAlertDialog
          handleLogout={handleLogout}
          onClick={handleLogoutClick}
        />
        <Hidden mdDown>
          <ListItem
            button
            component={Link}
            to="/cart"
            className={classes.linkText}
          >
            <ListItemIcon>
              <Badge badgeContent={cart ? cart.length : null} color="secondary">
                <ShoppingCartOutlinedIcon style={{ color: "white" }} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
        </Hidden>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <List
        component="nav"
        aria-labelledby="main navigation"
        className={classes.navDisplayFlex}
      >
        {status?.token ? signedIn() : signedOut()}
      </List>
    </React.Fragment>
  );
};

export default NavList;
