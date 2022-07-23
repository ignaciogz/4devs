import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

import './styles.scss'

import useChat from '../../hooks/useChat'
import useUtilities from '../../hooks/useUtilities'

const MODE_DEV = import.meta.env.VITE_ENV !== 'production'
const SERVER_DEV = import.meta.env.VITE_SERVER_URL_DEV
const SERVER_PROD = import.meta.env.VITE_SERVER_URL_PROD

const ChatMessages = ({ socket }) => {
  const { chatSchema } = useChat()
  const { getDenormalizeData } = useUtilities()
  const [messages, setMessages] = useState(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }

        newMessages[message.id] = message

        return newMessages
      })
    }

    const initListener = (data) => {
      setMessages(() => {
        data = getDenormalizeData(data, chatSchema, 'chat')

        return { ...data }
      })
    }

    socket.on('init', initListener)
    socket.on('new-message', messageListener)

    return () => {
      socket.off('init', initListener)
      socket.off('new-message', messageListener)
    }
  }, [socket])

  const clickHandler = () => {
    setShowAll(true)
  }

  return (
    <Box className="chat-messages" component="section">
      <List sx={{ bgcolor: 'background.paper' }}>
        {messages &&
          [...Object.values(messages)]
            .sort((a, b) => a.timestamp - b.timestamp)
            .slice(showAll ? 0 : -5)
            .map((item) => (
              <Box key={item.id}>
                <ListItem alignItems="flex-start" className="chat-item">
                  <ListItemAvatar>
                    <Avatar
                      alt={`avatar of ${item.author.name}`}
                      src={`${MODE_DEV ? SERVER_DEV : SERVER_PROD}${item.author.img}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          className="message-header"
                          color="text.primary"
                          title={`${item.author.email}`}
                        >
                          {item.author.name} <small>{item.timestamp}</small>
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={item.message}
                  />
                </ListItem>
                <Divider component="li" variant="inset" />
              </Box>
            ))}
        {messages && !showAll && (
          <Button aria-label="Show all messages" onClick={clickHandler}>
            Show all messages
          </Button>
        )}
      </List>
    </Box>
  )
}

export default ChatMessages
