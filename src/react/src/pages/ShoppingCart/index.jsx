import React, { useEffect } from 'react'

import '../../App.scss'

import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import CartDetail from '../../components/CartDetail'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'

const ShoppingCart = () => {
  const { checkLoggedIn } = useAuth()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <>
      <ResponsiveAppBar />
      <CartDetail />
      <Footer />
    </>
  )
}

export default ShoppingCart
