import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
  input: {
    color: "white",
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);

const EmailForm = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    sending: false,
    sent: false,
    error: null,
    formData: {
      email: null,
      content: null,
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setData({
      ...data,
      sending: true,
    });
    setData({
      ...data,
      sending: false,
      sent: true,
    });
    e.target.reset();
    // store
    //   .post(messageCreateURL, data.formData)
    //   .then((response) => {
    //     setData({
    //       ...data,
    //       sending: false,
    //       sent: true,
    //     });
    //   })
    //   .catch((error) => {
    //     setData({
    //       ...data,
    //       sending: false,
    //       error: error,
    //     });
    //   });
  };

  const handleChange = (e) => {
    const { formData } = data;
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setData({
      ...data,
      formData: updatedFormData,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setData({
      ...data,
      sent: false,
    });
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={data.sent}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Email sent!"
      >
        <Alert onClose={handleClose} severity="success">
          Message Sent!
        </Alert>
      </Snackbar>

      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CssTextField
              required
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <CssTextField
              required
              id="content"
              name="content"
              label="Content"
              variant="outlined"
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              fullWidth
              multiline
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="secondary">
              {data.sending ? <CircularProgress /> : "Send"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default EmailForm;
