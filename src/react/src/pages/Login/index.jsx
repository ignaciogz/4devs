import React, { useEffect } from 'react'

import '../../App.scss'

import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import UserLogin from '../../components/UserLogin'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  const { checkLoggedIn } = useAuth()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <>
      <ResponsiveAppBar />
      <UserLogin />
      <Footer />
    </>
  )
}

export default Login
