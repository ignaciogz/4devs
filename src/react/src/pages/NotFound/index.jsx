import React, { useEffect } from 'react'

import '../../App.scss'

import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import Error404 from '../../components/Error404'
import Footer from '../../components/Footer'
import useAuth from '../../hooks/useAuth'

const NotFound = () => {
  const { checkLoggedIn } = useAuth()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <>
      <ResponsiveAppBar />
      <Error404 />
      <Footer />
    </>
  )
}

export default NotFound
