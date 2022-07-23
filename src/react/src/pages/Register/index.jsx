import React, { useEffect } from 'react'

import '../../App.scss'

import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import UserRegister from '../../components/UserRegister'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'

const Register = () => {
  const { checkLoggedIn } = useAuth()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <>
      <ResponsiveAppBar />
      <UserRegister />
      <Footer />
    </>
  )
}

export default Register
