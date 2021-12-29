import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { searchURL } from "../../constants"
import { store } from "../../apis/store"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import CircularProgress from "@material-ui/core/CircularProgress"
import { fade, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    zIndex: 100,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
    results: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    result: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    resultContent: {
      display: "flex",
      flexDirection: "column",
    },
  },
}))

const Search = ({ setState, state, anchor }) => {
  const classes = useStyles()

  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [term, setTerm] = useState("")
  const [resultStyle, setResultStyle] = useState({
    position: "absolute",
    display: "none",
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (term) {
        setLoading(true)
        store
          .get(searchURL, {
            params: {
              search: term,
            },
          })
          .then((response) => {
            const results = response.data.results
            if (results.length > 0) {
              setResult(results)
            } else {
              setResult(null)
            }
            setLoading(false)
          })
          .catch((error) => {
            setLoading(false)
            setResult(null)
          })
      } else {
        setLoading(false)
        setResult([])
      }
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [term])

  const renderListItem = (item) => {
    return (
      <React.Fragment>
        <ListItem
          component={Link}
          to={`/product/${item.slug}/`}
          className={classes.item}
          button
        >
          <div className={classes.result}>
            <img src={item.images[0].image} height="32px" alt="search result" />
            <div style={{ display: "inline-block", paddingLeft: "10px" }}>
              <div className={classes.resultContent}>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ color: "black" }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  style={{ color: "black" }}
                >
                  Price:{" "}
                  {item.discount_price ? item.discount_price : item.price} AED
                </Typography>
              </div>
            </div>
          </div>
        </ListItem>
        <div>
          <hr
            style={{
              borderTop: "1px solid black",
              padding: 0,
              marginTop: "2px",
            }}
          />
        </div>
      </React.Fragment>
    )
  }

  const renderResults = () => {
    if (result !== null) {
      if (result.length > 1) {
        return (
          <List className={classes.root}>
            {result.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  {renderListItem(item)}
                </React.Fragment>
              )
            })}
          </List>
        )
      } else if (result.length !== 0) {
        return <List className={classes.root}>{renderListItem(result[0])}</List>
      }
    } else {
      return (
        <List className={classes.root}>
          <ListItem>
            {loading ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    varaint="body2"
                    className={classes.inline}
                    style={{ color: "black" }}
                  >
                    No products found
                  </Typography>
                }
              />
            )}
          </ListItem>
        </List>
      )
    }
  }

  const handleBlur = () => {
    setTimeout(() => {
      setResultStyle({
        ...resultStyle,
        display: "none",
      })
      if (setState) {
        setState({ ...state, [anchor]: false })
      }
    }, 500)
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setTerm(e.target.value)}
        onFocus={() =>
          setResultStyle({
            ...resultStyle,
            display: "block",
          })
        }
        onBlur={handleBlur}
        onClick={(e) => e.stopPropagation()}
      />
      <div
        className={classes.results}
        style={{
          position: resultStyle.position,
          display: resultStyle.display,
          width: "100%",
        }}
      >
        {renderResults()}
      </div>
    </div>
  )
}

export default Search
