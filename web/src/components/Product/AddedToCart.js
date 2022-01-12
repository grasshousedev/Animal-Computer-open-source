import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
  buttons: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkCircle: {
    strokeDasharray: "166",
    strokeDashoffset: "166",
    strokeWidth: "2",
    strokeMiterlimit: "10",
    stroke: "#7ac142",
    fill: "none",
    animation: "$stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards",
  },

  checkmark: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "block",
    strokeWidth: "2",
    stroke: "#fff",
    strokeMiterlimit: "10",
    margin: "0 auto 20px auto",
    boxShadow: "inset 0px 0px 0px #7ac142",
    animation:
      "$fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both",
  },

  checkmarkCheck: {
    transformOrigin: "50% 50%",
    strokeDasharray: "48",
    strokeFashoffset: "48",
    animation: "$stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards",
  },

  "@keyframes stroke": {
    "100%": {
      strokeDashoffset: "0",
    },
  },
  "@keyframes scale": {
    "0%, 100%": {
      transform: "none",
    },
    "50%": {
      transform: "scale3d(1.1, 1.1, 1)",
    },
  },
  "@keyframes fill": {
    "100%": {
      boxShadow: "inset 0px 0px 0px 30px #7ac142",
    },
  },
}));

const AddedToCart = ({ open, setOpen }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Item Added to Cart</DialogTitle>
      <div>
        <svg
          className={classes.checkmark}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className={classes.checkmarkCircle}
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className={classes.checkmarkCheck}
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <div className={classes.buttons}>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default AddedToCart;
