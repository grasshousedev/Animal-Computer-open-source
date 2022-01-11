import React from "react";
import { Link } from "react-router-dom";
import { productURL } from "../../constants";
import Truncate from "react-truncate";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    padding: theme.spacing(1),
    height: 150,
  },
  image: {
    maxHeight: 150,
    maxWidth: 200,
  },
  cardActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    height: 125,
    overflowY: "hidden",
  },
  description: {
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  actions: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  discount: {
    textDecoration: "line-through",
    color: theme.palette.grey[600],
  },
  title: {
    display: "block",
    maxWidth: 345,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

export default function ProductCard({ product }) {
  const classes = useStyles();

  const renderPrice = (discountPrice, price) => {
    return (
      <React.Fragment>
        {discountPrice ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <Typography variant="body1">
              <Box fontWeight="fontWeightBold" component="span">
                Price:{" "}
              </Box>{" "}
              {discountPrice} $ &nbsp;
            </Typography>
            <Typography variant="body1" className={classes.discount}>
              {price} $
            </Typography>
          </div>
        ) : (
          <Typography variant="body1" component="p">
            <Box fontWeight="fontWeightBold" component="span">
              Price:{" "}
            </Box>
            {price} $
          </Typography>
        )}
      </React.Fragment>
    );
  };

  const renderCardLink = () => {
    if (product) {
      return (
        <Link to={productURL(product._id)} className={classes.link}>
          <CardActionArea>
            <CardContent>
              <div className={classes.media}>
                <img
                  alt="ProductImg"
                  src={product.imageURL1}
                  className={classes.image}
                />
              </div>
              <Typography gutterBottom variant="h6" component="h2">
                <span className={classes.title}>{product.title}</span>
              </Typography>
              {product.productType === "Laptop" ? (
                <div className={classes.cardContent}>
                  <div className={classes.description}>
                    <Truncate
                      lines={2}
                      style={{ textAlign: "left" }}
                      ellipsis={<span>...</span>}
                    >
                      {product.description}
                    </Truncate>
                  </div>
                  {product.productType === "Laptop" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <ul
                        style={{
                          listStyle: "square",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          paddingLeft: 20,
                          textAlign: "left",
                        }}
                      >
                        <li>{`${product.processorName} ${product.processorDetail}`}</li>
                        <li>{`${product.display} ${product.displayDetails}`}</li>

                        <React.Fragment>
                          <li>{product.ram}</li>
                          <li>{product.storage}</li>
                        </React.Fragment>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div>
                  <div className={classes.description}>
                    <Truncate
                      lines={2}
                      style={{ textAlign: "left" }}
                      ellipsis={<span>...</span>}
                    >
                      {product.description}
                    </Truncate>
                  </div>
                  {product.productType === "Laptop" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <ul
                        style={{
                          listStyle: "square",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          paddingLeft: 20,
                          textAlign: "left",
                        }}
                      >
                        <li>{`${product.processorName} ${product.processorDetail}`}</li>
                        <li>{`${product.display} ${product.displayDetails}`}</li>

                        <React.Fragment>
                          <li>{product.ram}</li>
                          <li>{product.storage}</li>
                        </React.Fragment>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </CardContent>
          </CardActionArea>
        </Link>
      );
    } else {
      return (
        <Typography color="primary" component="h2" variant="h2">
          A fatal error has occurred!
        </Typography>
      );
    }
  };

  return (
    <Grid item>
      <Card className={classes.root}>
        {renderCardLink()}
        <CardActions className={classes.cardActions}>
          <ul className={classes.actions}>
            <li>
              {/* {product.productType === "Accessory" */}
              {product.productType === "Laptop"
                ? renderPrice(product.discountPrice, product.price)
                : product.price.length > 0
                ? renderPrice(product.discountPrice, product.price)
                : "Out of stock"}
            </li>
            <li>
              <Link to={productURL(product._id)} className={classes.link}>
                <Button color="secondary">View Details</Button>
              </Link>
            </li>
          </ul>
        </CardActions>
      </Card>
    </Grid>
  );
}
