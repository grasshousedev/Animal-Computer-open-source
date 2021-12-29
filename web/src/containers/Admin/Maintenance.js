import React, { useState, useEffect } from 'react'

import { authStore } from '../../apis/store'
import { maintenanceURL, maintenanceUpdateURL } from '../../constants'

import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Title from './Title'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        width: 300,
    },
    submit: {
        marginTop: theme.spacing(1)
    }
}))

const Maintenance = () => {
    const classes = useStyles()
    const [state, setState] = useState({
        under_maintenance: false,
        start_time: null,
        end_time: null,
        sending: false,
        sent: false,
    })


    useEffect(() => {
        authStore.get(maintenanceURL)
            .then(response => {
                setState({
                    ...state,
                    ...response.data.results[0]
                })
            })
            .catch(error => error)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        setState({
            ...state,
            sending: true
        })
        authStore.patch(maintenanceUpdateURL, state)
        .then(response => {
            setState({
                ...response.data,
                sending: false,
                sent: true
            })
        })
        .catch(error => setState({...state, sending: false}))
    } 

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    
    const handleCheck = e => {
        setState({
            ...state,
            [e.target.name]: e.target.checked
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setState({
            ...state,
            sent: false
        })
    }

    return (
        <React.Fragment>
            <Title>
                Maintenance
            </Title>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={state.sent}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Maintenance notification updated!"
            >
                <Alert onClose={handleClose} severity="success">
                    Maintenance notification updated!
                </Alert>
            </Snackbar>
            <form onSubmit={onSubmit}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={state ? state.under_maintenance : false} name="under_maintenance" onChange={handleCheck} inputProps={{ 'aria-label': 'primary checkbox' }} />}
                            label="Set to under maintenance?"
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="start-time"
                            label="Start Time"
                            name="start_time"
                            onChange={handleChange}
                            type="datetime-local"
                            value={state ? state.start_time ? state.start_time.slice(0, 16) : "2021-05-25T10:30" : ""}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="end-time"
                            label="End Time"
                            type="datetime-local"
                            name="end_time"
                            onChange={handleChange}
                            value={state ? state.end_time ? state.end_time.slice(0, 16) : "2021-05-25T10:30" : ""}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {state.sending ? (<CircularProgress />) : 'Save'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

export default Maintenance