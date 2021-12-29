import React, { useState, useEffect } from "react"
import { authStore } from "../../apis/store"
import { messagesURL, messageUnreadURL } from "../../constants"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Pagination from "@material-ui/lab/Pagination"
import Title from "./Title"

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: theme.palette.grey[500],
    "&:hover": {
      cursor: "pointer",
    },
  },
  pagination: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}))

const Messages = ({ state, setState }) => {
  const classes = useStyles()

  const [messages, setMessages] = useState({
    loading: true,
    payload: [],
    count: 1,
    next: null,
    previous: null,
    unread: null,
  })

  const [page, setPage] = useState(1)

  const fetchMessages = (url) => {
    authStore
      .get(url, {
        params: {
          ordering: "read",
        },
      })
      .then((response) => {
        authStore
          .get(messageUnreadURL)
          .then((res) => {
            const unread = res.data.unread
            const count = Math.round(response.data.count / 10)
            setMessages({
              ...messages,
              loading: false,
              payload: response.data.results,
              count: count,
              next: response.data.next,
              previous: response.data.previous,
              unread: unread,
            })
          })
          .catch((error) => {
            setMessages({
              ...messages,
              loading: false,
            })
          })
      })
      .catch((error) => {
        setMessages({
          ...messages,
          loading: false,
        })
      })
  }

  useEffect(() => {
    fetchMessages(messagesURL)
  }, [])

  const handleChange = (event, value) => {
    if (value > page) {
      setPage(value)
      fetchMessages(messages.next)
    } else if (value < page) {
      setPage(value)
      fetchMessages(messages.previous)
    } else {
      event.preventDefault()
    }
  }

  const generateList = () => {
    if (messages.payload && messages.payload.length === 1) {
      const message = messages.payload[0]
      return (
        <React.Fragment>
          <ListItem
            button
            onClick={() => {
              setState({
                ...state,
                message: message,
                tab: "MessageDetail",
              })
            }}
          >
            <ListItemText
              primary={message.email}
              className={message.read ? classes.listItem : ""}
            />
          </ListItem>
        </React.Fragment>
      )
    } else if (messages.payload && messages.payload.length > 1) {
      return messages.payload.map((message) => {
        return (
          <ListItem
            divider
            button
            key={message.id}
            onClick={() => {
              setState({
                ...state,
                tab: "MessageDetail",
                message: message,
              })
            }}
          >
            <ListItemText
              primary={message.email}
              className={message.read ? classes.listItem : ""}
            />
          </ListItem>
        )
      })
    } else if (messages.loading === true) {
      return <CircularProgress />
    } else {
      return (
        <Typography variant="h4" component="p" color="secondary">
          You don't have any messages
        </Typography>
      )
    }
  }

  return (
    <React.Fragment>
      <Title>Messages</Title>
      <div>
        <Typography variant="body1" component="p">
          Unread Messages: {messages.unread ? messages.unread : 0}
        </Typography>
      </div>
      <List>{generateList()}</List>
      {messages.count !== 0 ? (
        <div className={classes.pagination}>
          <Pagination
            count={messages.count}
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

export default Messages
