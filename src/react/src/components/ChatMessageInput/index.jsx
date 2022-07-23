import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import './styles.scss'

import useAuth from '../../hooks/useAuth'

const ChatMessageInput = ({ socket }) => {
  const { checkLoggedIn } = useAuth()
  const [message, setMessage] = useState('')

  const submitForm = async (e) => {
    e.preventDefault()

    const loggedIn = await checkLoggedIn()

    if (loggedIn) {
      const newMessage = {
        message,
      }

      socket.emit('new-message', newMessage)
      setMessage('')
    }
  }

  return (
    <Box className="chat-message-input" component="section">
      <Box autoComplete="off" component="form" method="post" role="form" onSubmit={submitForm}>
        <TextField
          autoFocus
          fullWidth
          required
          label="message"
          name="message"
          placeholder="Type your message. Press 'enter' to send."
          size="small"
          type="text"
          value={message}
          variant="outlined"
          onChange={(e) => {
            setMessage(e.currentTarget.value)
          }}
        />
      </Box>
    </Box>
  )
}

export default ChatMessageInput
