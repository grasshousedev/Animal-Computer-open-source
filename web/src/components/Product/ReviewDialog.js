import React, { useState } from 'react'
import { store } from '../../apis/store'
import { ratingCreateURL } from '../../constants'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Rating from '@material-ui/lab/Rating'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export default function ReviewDialog({ title, id, ratings, setRatings }) {
    const [open, setOpen] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState(false)
    const [form, setForm] = useState({
        name: '',
        stars: 5,
        content: '',
        product: id
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    const handleChange = (e) => {
        const myObj = {
            [e.target.name]: e.target.value
        }

        setForm({
            ...form,
            ...myObj
        })
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        if(sent === true) {
            setSent(false)
        } else {
            setError(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        store.post(ratingCreateURL, form)
            .then(response => {
                setSent(true)
                setRatings({
                    ...ratings,
                    loading: true
                })
                handleClose()
            })
            .catch(error => {
                setError(true)
                handleClose()
             })
    }


    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={sent}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Review Submitted!"
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    Review submitted!
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={error}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Review submission failed."
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    Failed to submit the review.
                </Alert>
            </Snackbar>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Add Review
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tell us what you think about this product.
                    </DialogContentText>
                    <Rating
                        name="simple-controlled"
                        value={form.stars}
                        onChange={(event, newValue) => {
                            setForm({ ...form, stars: newValue })
                        }}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Name"
                        name="name"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="title"
                        label="Title"
                        name="title"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="content"
                        label="Review"
                        name="content"
                        multiline
                        fullWidth
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}