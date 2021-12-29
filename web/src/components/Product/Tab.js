import React, { useState } from "react";
import Ratings from "./Ratings";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.paper,
  },
}));

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simpel-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const tabProps = (index = 1) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const ProductTab = ({
  productID,
  productTitle,
  description,
  manufacturer_url,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Rating, Specs Tab"
        >
          <Tab label="Specifications" {...tabProps(0)} />
          {/* <Tab label="Reviews" {...tabProps(1)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List>
          <ListItem>
            <Typography variant="body1" component="p">
              {description}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" component="p">
              For more details, head over to the{" "}
              <span>
                <a target="_blank" href={manufacturer_url}>
                  official website {productTitle}
                </a>
              </span>
              .
            </Typography>
          </ListItem>
        </List>
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <Ratings productID={productID} title={productTitle} />
      </TabPanel> */}
    </div>
  );
};

export default ProductTab;
