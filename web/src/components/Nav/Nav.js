import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getCart } from "../../cartLocal"

import SideDrawer from "./SideDrawer"
import NavList from "./NavList"
import Search from "./Search"

import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Hidden from "@material-ui/core/Hidden"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Badge from "@material-ui/core/Badge"
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"

const useStyles = makeStyles((theme) => ({
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    paddingLeft: "20px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
    },
  },
  logo: {
    maxHeight: 60,
    [theme.breakpoints.down("md")]: {
      maxHeight: 50,
    },
  },
  logoButton: {
    [theme.breakpoints.down("md")]: {
      padding: 0,
      margin: 0,
    },
  },
  div: {
    color: "#E5E5E5",
    textTransform: "none",
  },
  first: {
    fontSize: "0.90rem",
  },
  second: {
    fontSize: "0.50rem",
  },
}))

const Nav = () => {
  const classes = useStyles()
  const token = localStorage.getItem("token")
  let cart = useSelector((state) =>
    state.cart && state.cart.shoppingCart ? state.cart.shoppingCart.items : null
  )
  // Only for updating upon fetch cart
  let updateCart = useSelector((state) => state.cart)
  if (!token) {
    cart = getCart()
  }

  return (
    <div className="NavBar" style={{ marginBottom: "100px" }}>
      <AppBar position="fixed">
        <Toolbar className={classes.navDisplayFlex}>
          <Link to="/" className={classes.linkText}>
            <Box className={classes.box} component="div">
              <img
                className={classes.logo}
                alt="Site logo"
                src="/static/assets/logo.png"
              />
              <div className={classes.div}>
                <Typography
                  variant="body1"
                  color="secondary"
                  className={classes.first}
                >
                  ALAMAL COMPUTERS
                </Typography>
                <Typography variant="subtitle1" className={classes.second}>
                  Computers and Mobile Phones Trading
                </Typography>
              </div>
            </Box>
          </Link>

          <Hidden lgUp>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Link to="/cart">
                <IconButton>
                  <Badge
                    badgeContent={cart ? cart.length : null}
                    color="secondary"
                  >
                    <ShoppingCartOutlinedIcon style={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </Link>
              <SideDrawer />
            </div>
          </Hidden>
          <Hidden mdDown>
            <div className={classes.navDisplayFlex}>
              <Search />
              <NavList cart={cart} />
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav
