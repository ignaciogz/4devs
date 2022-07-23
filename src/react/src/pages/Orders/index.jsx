import React, { useEffect } from 'react'

import '../../App.scss'

import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import UserOrders from '../../components/UserOrders'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'

const Orders = () => {
  const { checkLoggedIn } = useAuth()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <>
      <ResponsiveAppBar />
      <UserOrders />
      <Footer />
    </>
  )
}

export default Orders
