import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import './styles.scss'

import useAuth from '../../hooks/useAuth'
import ChatMessages from '../ChatMessages'
import ChatMessageInput from '../ChatMessageInput'

const MODE_DEV = import.meta.env.VITE_ENV !== 'production'
const SERVER_DEV = import.meta.env.VITE_SERVER_URL_DEV
const SERVER_PROD = import.meta.env.VITE_SERVER_URL_PROD

const ChatContainer = () => {
  const navigate = useNavigate()
  const { isLogged } = useAuth()
  const [loader, setLoader] = useState(true)
  const [isConnected, setIsConnected] = useState()
  const [socket, setSocket] = useState()

  // ↓ ****** START - AUTH ****** ↓
  useEffect(() => {
    !isLogged && navigate('/login')

    setLoader(false)
  }, [])
  // ↑ ****** END - AUTH ****** ↑

  useEffect(() => {
    !isLogged && navigate('/login')

    const newSocket = io(`${MODE_DEV ? SERVER_DEV : SERVER_PROD}`, {
      withCredentials: true,
    })

    setSocket(newSocket)

    newSocket.on('connect', () => {
      setIsConnected(true)
      setLoader(false)
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    return () => {
      newSocket.close()
      newSocket.off('connect')
      newSocket.off('disconnect')
    }
  }, [setSocket])

  return (
    <Box className="chat" component="section">
      {loader ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="chat-container">
          <h1>CHAT</h1>
          <ChatMessages socket={socket} />
          <ChatMessageInput socket={socket} />
        </Box>
      )}
    </Box>
  )
}

export default ChatContainer
