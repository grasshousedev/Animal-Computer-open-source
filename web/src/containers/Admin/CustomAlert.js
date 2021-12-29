import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

export default function CustomAlert({ handleProcess, content, button, title }) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (e) => {
    e.stopPropagation()
    setOpen(true)
  }

  const handleSaveClose = (e) => {
    handleProcess()
    setOpen(false)
  }

  const handleClose = (e) => {
    e.stopPropagation()
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" color="secondary">
        {button}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveClose} color="secondary" autoFocus>
            {button}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
