import React, { useState, useEffect } from "react"
import { store } from "../../apis/store"
import { ratingsURL } from "../../constants"
import ReviewDialog from "./ReviewDialog"

import Typography from "@material-ui/core/Typography"
import CircularPrograss from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import Rating from "@material-ui/lab/Rating"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import Pagination from "@material-ui/lab/Pagination"
import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}))

const Ratings = ({ productID, title }) => {
  const classes = useStyles()
  const [ratings, setRatings] = useState({
    loading: true,
    payload: [],
    count: 1,
    next: null,
    previous: null,
  })
  const [page, setPage] = useState(1)
  const getRatings = () => {
    store
      .get(ratingsURL, {
        params: {
          product_id: productID,
        },
      })
      .then((response) => {
        const count = Math.round(response.data.count / 10)
        setRatings({
          ...ratings,
          loading: false,
          payload: response.data.results,
          count: count,
          next: response.data.next,
          previous: response.data.previous,
        })
      })
      .catch((error) => {
        setRatings({
          ...ratings,
          loading: false,
        })
      })
  }

  useEffect(() => {
    getRatings()
  }, [ratings.loading])

  const handleChange = (event, value) => {
    if (value > page) {
      setPage(value)
      getRatings(ratings.next)
    } else if (value < page) {
      setPage(value)
      getRatings(ratings.previous)
    } else {
      event.preventDefault()
    }
  }

  const renderSingleRating = (rating) => {
    return (
      <List key={rating.id}>
        <ListItem>
          <Typography variant="body1" component="p">
            {rating.name}
          </Typography>
        </ListItem>
        <ListItem>
          <Rating name="read-only" value={rating.stars} readOnly />
        </ListItem>
        <ListItem>
          <Typography variant="body1" component="p">
            {new Date(rating.added).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1" component="p">
            {rating.content}
          </Typography>
        </ListItem>
        <Divider />
      </List>
    )
  }

  const renderRatings = () => {
    if (ratings.loading === true) {
      return <CircularPrograss />
    } else if (ratings.payload && ratings.payload.length === 1) {
      const rating = ratings.payload[0]
      return <React.Fragment>{renderSingleRating(rating)}</React.Fragment>
    } else if (ratings.payload && ratings.payload.length === 0) {
      return (
        <Box p={4}>
          <Typography variant="h6" component="p">
            No reviews yet
          </Typography>
        </Box>
      )
    } else {
      return (
        <React.Fragment>
          {ratings.payload.map((rating) => renderSingleRating(rating))}
          {ratings.count !== 0 ? (
            <div className={classes.pagination}>
              <Pagination
                count={ratings.count}
                shape="rounded"
                onChange={handleChange}
                page={page}
              />
            </div>
          ) : (
            ""
          )}
        </React.Fragment>
      )
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {renderRatings()}
      </Grid>
      <Grid item xs={12}>
        <ReviewDialog
          title={title}
          id={productID}
          setRatings={setRatings}
          ratings={ratings}
        />
      </Grid>
    </Grid>
  )
}

export default Ratings
