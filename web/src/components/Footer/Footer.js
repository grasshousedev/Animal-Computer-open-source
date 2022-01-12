import React from "react";
import { Link } from "react-router-dom";
import MessageForm from "./MessageForm";
import Copyright from "../Copyright";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import EmailIcon from "@material-ui/icons/Email";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    overflowX: "hidden",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "white",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  item: {
    marginTop: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.footer}>
        <Container maxWidth="lg">
          <div style={{ paddingTop: 20 }}>
            <Grid container justify="flex-start" alignItems="flex-start">
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <List dense>
                  <ListItem>
                    <Typography variant="h5" component="h4">
                      Links
                    </Typography>
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/page/team"
                    className={classes.linkText}
                  >
                    <ListItemText primary="Our Team" />
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/page/about"
                    className={classes.linkText}
                  >
                    <ListItemText primary="About Al-amal" />
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/page/terms"
                    className={classes.linkText}
                  >
                    <ListItemText primary="Terms of Service" />
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/page/cookies"
                    className={classes.linkText}
                  >
                    <ListItemText primary="Cookie Policy" />
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/page/privacy"
                    className={classes.linkText}
                  >
                    <ListItemText primary="Privacy Policy" />
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/page/license"
                    className={classes.linkText}
                  >
                    <ListItemText primary="License Details" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={3}>
                <List dense>
                  <ListItem>
                    <Typography variant="h5" component="h4">
                      Products
                    </Typography>
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/products/Laptop"
                    className={classes.linkText}
                  >
                    <ListItemText primary="Laptops" />
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/products/Accessory"
                    className={classes.linkText}
                  >
                    <ListItemText primary="Accessories" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <List dense>
                  <ListItem>
                    <Typography variant="h5" component="h4">
                      Contact Us
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="+971 65 340509" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WhatsAppIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="+971 55 443 5313" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <RoomIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="PO Box 60501" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="info@alamalcomputers.com" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <List dense>
                  <ListItem>
                    <Typography variant="h5" component="h4">
                      Email Us
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <MessageForm />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12}>
                <Copyright />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Footer;
