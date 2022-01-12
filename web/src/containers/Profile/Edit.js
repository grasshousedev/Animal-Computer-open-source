import React, { useState, useEffect } from "react";
import { authStore } from "../../apis/store";
import { updateUserURL } from "../../constants";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Edit = ({ state, setState }) => {
  const classes = useStyles();
  const [details, setDetails] = useState({
    saving: false,
    success: null,
    error: null,
    formData: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
    },
  });

  const { formData } = details;

  useEffect(() => {
    setDetails({
      ...details,
      formData: {
        id: state.user.id || "",
        firstName: state.user.firstName || "",
        lastName: state.user.lastName || "",
        phoneNumber: state.user.phoneNumber || "",
        address: state.user.address || "",
      },
    });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDetails({
      ...details,
      saving: true,
    });
    authStore
      .post(
        updateUserURL,
        {
          firstName: details.formData.firstName,
          lastName: details.formData.lastName,
          phoneNumber: details.formData.phoneNumber,
          address: details.formData.address,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setState({
          option: "account",
          user: { ...response.data },
        });
        setDetails({
          ...details,
          success: true,
          saving: false,
        });
      })
      .catch((error) => {
        setDetails({
          ...details,
          success: false,
          saving: false,
          error: true,
        });
      });
  };

  const handleChange = (e) => {
    const { formData } = details;
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setDetails({
      ...details,
      formData: updatedFormData,
    });
  };

  return (
    <React.Fragment>
      {details.success === true ? (
        <Typography variant="h4" color="primary">
          Your information has been successfully updated!
        </Typography>
      ) : details.success === false ? (
        <Typography variant="h4" color="secondary">
          There was an error in updating the data
        </Typography>
      ) : (
        ""
      )}
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="First name"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.firstName}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last name"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.lastName}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.phoneNumber}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              label="Address"
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.address}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {details.saving === true ? (
            <CircularProgress color="primary" />
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Edit;
