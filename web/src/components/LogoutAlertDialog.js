import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

export default function LogoutAlertDialog({handleLogout}) {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = (e) => {
        e.stopPropagation()
        setOpen(true)
    }

    const handleLogoutClose = (e) => {
        handleLogout()
        setOpen(false)
    }

    const handleClose = (e) => {
        e.stopPropagation()
        setOpen(false)
    }

    return (
        <div>
            <ListItem button onClick={handleClickOpen}>
                <ListItemText primary="LOGOUT" />
            </ListItem>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogoutClose} color="primary" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}