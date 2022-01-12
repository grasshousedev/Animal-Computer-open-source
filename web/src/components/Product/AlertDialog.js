import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: 0,
    margin: 0,
  },
}));

const AlertDialog = ({
  title,
  content,
  handleDone,
  handleDismiss,
  action,
  dismiss,
}) => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const handleClose = () => {
    handleDismiss();
    setOpen(false);
  };
  const handleDoneClick = () => {
    handleDone();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        <DialogContent className={classes.dialog}>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {dismiss}
          </Button>
          <Button onClick={handleDoneClick} color="primary" autoFocus>
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
