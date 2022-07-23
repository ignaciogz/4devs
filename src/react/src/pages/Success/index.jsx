import React, { useEffect } from 'react'

import '../../App.scss'

import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import OrderSuccess from '../../components/OrderSuccess'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'

const Success = () => {
  const { checkLoggedIn } = useAuth()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <>
      <ResponsiveAppBar />
      <OrderSuccess />
      <Footer />
    </>
  )
}

export default Success
