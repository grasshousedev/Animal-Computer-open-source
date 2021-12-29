import React, { useEffect } from "react"
import { authStore } from "../../apis/store"
import { messageUpdateURL } from "../../constants"

import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Title from "./Title"

const MessageDetail = ({ message, state, setState }) => {
  useEffect(() => {
    const updateMessage = () => {
      authStore
        .patch(messageUpdateURL(message.id), { read: "True" })
        .then((response) => {
          return response
        })
        .catch((error) => {
          return error
        })
    }

    updateMessage()
  }, [])

  return (
    <Grid container justify="flex-start">
      <Grid item xs={12}>
        <Title>Message Detail</Title>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h6" component="p">
                  Email:
                  <Typography variant="body1" component="span">
                    {` ${message.email}`}
                  </Typography>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h6" component="p">
                  Sent at:
                  <Typography variant="body1" component="span">
                    {` ${message.sent}`}
                  </Typography>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h6" component="p">
                  Content:
                  <Typography variant="body1" component="span">
                    {` ${message.content}`}
                  </Typography>
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          onClick={() => setState({ ...state, tab: "Messages" })}
          variant="contained"
          color="primary"
        >
          Back
        </Button>
      </Grid>
    </Grid>
  )
}

export default MessageDetail
