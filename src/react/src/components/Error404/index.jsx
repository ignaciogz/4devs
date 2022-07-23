import * as React from 'react'
import Box from '@mui/material/Box'

import './styles.scss'

import notFound from '../../assets/img/404.png'

const Error404 = () => {
  return (
    <Box className="error-404" component="section">
      <img alt="page not found" src={notFound} />
      <h1>Page not found</h1>
    </Box>
  )
}

export default Error404
