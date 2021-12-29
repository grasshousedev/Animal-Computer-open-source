import React, { useState } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Drawer from "@material-ui/core/Drawer"
import Box from "@material-ui/core/Box"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Home from "@material-ui/icons/Home"

import Chart from "./Chart"
import Deposits from "./Deposits"
import OrderDetail from "./OrderDetail"
import Orders from "./Orders"
import ListItems from "./ListItems"
import Messages from "./Messages"
import MessageDetail from "./MessageDetail"
import Maintenance from "./Maintenance"
import Discount from "./Discount"
import Copyright from "../../components/Copyright"

import ScrollToTopOnMount from "../../components/ScrollToTopOnMount"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  inline: {
    display: "inline",
  },
  fixedHeight: {
    height: 240,
  },
  detail: {
    padding: theme.spacing(2),
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  div: {
    position: "relative",
  },
  read: {
    backgroundColor: "#f5f5f5",
  },
}))

export default function Dashboard() {
  const classes = useStyles()
  const [state, setState] = useState({
    tab: "Dashboard",
    open: false,
    orderId: null,
    message: null,
  })

  const handleDrawerOpen = () => {
    setState({ ...state, open: true })
  }
  const handleDrawerClose = () => {
    setState({ ...state, open: false })
  }

  const renderTab = () => {
    if (state.tab === "Dashboard") {
      return (
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
      )
    } else if (state.tab === "Orders") {
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders state={state} setState={setState} />
          </Paper>
        </Grid>
      )
    } else if (state.tab === "Deposits") {
      return (
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
      )
    } else if (state.tab === "Messages") {
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Messages state={state} setState={setState} />
          </Paper>
        </Grid>
      )
    } else if (state.tab === "MessageDetail") {
      return (
        <Grid item xs={12}>
          <Paper className={classes.detail}>
            <MessageDetail
              message={state.message}
              state={state}
              setState={setState}
            />
          </Paper>
        </Grid>
      )
    } else if (state.tab === "Maintenance") {
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Maintenance />
          </Paper>
        </Grid>
      )
    } else if (state.tab === "Discount") {
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Discount />
          </Paper>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12}>
          <Paper className={classes.detail}>
            <OrderDetail id={state.orderId} state={state} setState={setState} />
          </Paper>
        </Grid>
      )
    }
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ScrollToTopOnMount />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, state.open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              state.open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit" component={Link} to="/">
            <Home style={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !state.open && classes.drawerPaperClose
          ),
        }}
        open={state.open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItems state={state} setState={setState} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {renderTab()}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}
