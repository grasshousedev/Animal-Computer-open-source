import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import Cart from "./Cart";

const CartView = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box component="div" mb={4}>
          <Typography variant="h2" component="h2">
            Cart
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Cart />
      </Grid>
    </Grid>
  );
};

export default CartView;
