import React, { useEffect } from 'react'

import '../../App.scss'

import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import ProductDetail from '../../components/ProductDetail'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'

const Product = () => {
  const { checkLoggedIn } = useAuth()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <>
      <ResponsiveAppBar />
      <ProductDetail />
      <Footer />
    </>
  )
}

export default Product
