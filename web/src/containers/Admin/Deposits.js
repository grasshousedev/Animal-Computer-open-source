import React, {useState, useEffect} from 'react'
import { authStore } from '../../apis/store'
import { earningsURL } from '../../constants'

import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Title from './Title'

export default function Deposits() {
    const [earnings, setEarnings] = useState({
        loading: true,
        error: null,
        data: null
    })
    
    useEffect(() => {
        authStore.get(earningsURL('all'))
        .then(response => {
            setEarnings({
                ...earnings,
                loading: false,
                data: response.data
            })
        })
        .catch(error => {
            setEarnings({
                ...earnings,
                error: error
            })
        })
    }, [])

    const renderEarnings = () => {
        if(earnings.loading === true) {
            return <CircularProgress />
        } else if(earnings.loading === false && earnings.data !== null) {
            return (
                <Typography component="p" variant="h4">
                    {earnings.data.earnings} AED
                </Typography>
            )
        } else {
            return (
                <Typography component="p" variant="h4">
                    An error has occurred!
                </Typography>
            )
        }
    }

    return (
        <React.Fragment>
            <Title>Total Earnings</Title>
            {renderEarnings()}
        </React.Fragment>
    )
}