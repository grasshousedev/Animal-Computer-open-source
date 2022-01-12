import React, { useState } from "react";
import NavList from "./NavList";
import Search from "./Search";
import Menu from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  paper: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  innerDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textTransform: "uppercase",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  searchDiv: {
    padding: theme.spacing(1),
  },
}));

const SideDrawer = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const sideDrawerList = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        <div className={classes.innerDiv}>
          <Typography variant="h6" component="p" color="secondary">
            Alamal Computers
          </Typography>
        </div>
      </Link>
      <div className={classes.searchDiv}>
        <Search setState={setState} state={state} anchor={anchor} />
      </div>
      <NavList />
    </div>
  );

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <Menu fontSize="large" style={{ color: "white" }} />
      </IconButton>
      <Drawer
        classes={{ paper: classes.paper }}
        className={classes.drawer}
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left", false)}
      >
        {sideDrawerList("left")}
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
