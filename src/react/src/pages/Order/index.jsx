import React, { useEffect } from 'react'

import '../../App.scss'

import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import OrderDetail from '../../components/OrderDetail'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'

const Order = () => {
  const { checkLoggedIn } = useAuth()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <>
      <ResponsiveAppBar />
      <OrderDetail />
      <Footer />
    </>
  )
}

export default Order
