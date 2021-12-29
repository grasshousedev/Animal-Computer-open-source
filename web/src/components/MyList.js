import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    linkText: {
        textDecoration: 'none',
        color: 'black'
    }
}))

const CustomizedListItem = ({ item, heading, state, setState }) => {
    const classes = useStyles()
    const [ open, setOpen ]  = useState(false)
    const handleClick = (e) => {
        setOpen(!open)
        e.stopPropagation()
    }

    const handleThisClick = e => {
        e.stopPropagation()
    }

    const handleCheck = e => {
        setState({
            ...state,
            filters: {
                ...state.filters,
                [e.target.name]: e.target.checked
            }
        })
    }

    return (
        <React.Fragment>
            { item ? (
                    <div>
                        <ListItem button onClick={handleClick} className={classes.linkText}>
                            <ListItemText primary={heading} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={open}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List component='li' disablePadding>
                                {
                                    item.length > 1 ? (
                                        item.map(cat => (
                                            <ListItem button className={classes.nested} key={cat} >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={state.filters[cat] || false}
                                                        disableRipple
                                                        name={cat}
                                                        onChange={handleCheck}
                                                        color="secondary"
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary={cat} className={classes.linkText} />
                                            </ListItem>
                                        ))
                                    ) : item.length === 1 ? (
                                            <ListItem key={item[0]} button className={classes.nested} >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={state.filters[item[0]] || false}
                                                        disableRipple
                                                        name={item[0]}
                                                        onChange={handleCheck}
                                                        color="secondary"
                                                    />
                                                </ListItemIcon>
                                            <ListItemText primary={item[0]} className={classes.linkText} />
                                        </ListItem>
                                    ) : (
                                        <ListItem button onClick={handleThisClick}>
                                            <ListItemText primary="No products available" className={classes.linkText} />
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Collapse>
                    </div>
                ) : ('')
            }
        </React.Fragment>
    )
}


export default function MyList({data, state, setState}) {
    const classes = useStyles()
    return (
        <div>
            <List 
                component='nav' 
                aria-labelledby='nested-list-subheader'
                className={classes.root}
            >
                {data && (Object.keys(data).map(key => {
                    return (
                        <CustomizedListItem key={key} item={data[key]} heading={key.toUpperCase()} state={state} setState={setState} />
                    )
                }))}
            </List>
        </div>
    )
}