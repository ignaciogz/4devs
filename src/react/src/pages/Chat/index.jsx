import React, { useEffect } from 'react'

import '../../App.scss'

import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import ChatContainer from '../../components/ChatContainer'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'

const Chat = () => {
  const { checkLoggedIn } = useAuth()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <>
      <ResponsiveAppBar />
      <ChatContainer />
      <Footer />
    </>
  )
}

export default Chat
