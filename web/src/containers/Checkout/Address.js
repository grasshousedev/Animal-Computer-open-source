import React from "react";
import AddressForm from "./AddressForm";
import Grid from "@material-ui/core/Grid";

export default function Address() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AddressForm />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
