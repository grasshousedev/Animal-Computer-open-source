import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.text.secondary
        }
    },
}))


export default function IconBreadcrumbs(props) {
    const classes = useStyles()

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/" className={classes.link}>
                <HomeIcon className={classes.icon} />
                Al-Amal
            </Link>
            {React.Children.toArray(props.children).map(link => React.cloneElement(link, { className: classes.link }))}
        </Breadcrumbs>
    )
}