import React from "react"
import { Link } from "react-router-dom"

import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import DashboardIcon from "@material-ui/icons/Dashboard"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import BarChartIcon from "@material-ui/icons/BarChart"
import AddBoxIcon from "@material-ui/icons/AddBox"
import EmailIcon from "@material-ui/icons/Email"
import BuildIcon from "@material-ui/icons/Build"
import MoneyOffIcon from "@material-ui/icons/MoneyOff"

const ListItems = ({ state, setState }) => {
  return (
    <div>
      <ListItem button onClick={() => setState({ ...state, tab: "Dashboard" })}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => setState({ ...state, tab: "Orders" })}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button onClick={() => setState({ ...state, tab: "Messages" })}>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>
      <ListItem button onClick={() => setState({ ...state, tab: "Deposits" })}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Deposits" />
      </ListItem>
      <ListItem button onClick={() => setState({ ...state, tab: "Discount" })}>
        <ListItemIcon>
          <MoneyOffIcon />
        </ListItemIcon>
        <ListItemText primary="Discount" />
      </ListItem>
      <ListItem
        button
        onClick={() => setState({ ...state, tab: "Maintenance" })}
      >
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Maintenance" />
      </ListItem>
    </div>
  )
}

export default ListItems
