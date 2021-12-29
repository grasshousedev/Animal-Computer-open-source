import React from 'react'
import {Link} from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Button from '@material-ui/core/Button'

const Error = ({message}) => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <ErrorOutlineIcon color="error" />
                <Typography color="error">Oops! An error has occurred :-/</Typography>
                {message ? (<Typography color="error">{message}</Typography>) : ''}
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" component={Link} to="/">
                    Go to homepage
                </Button>
            </Grid>
        </Grid>
    )
}

export default Error