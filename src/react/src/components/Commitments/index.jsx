import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import './styles.scss'

import CreditCardIcon from '@mui/icons-material/CreditCardRounded'
import ReturnIcon from '@mui/icons-material/AssignmentReturn'
import ShippingIcon from '@mui/icons-material/LocalShipping'

const Commitments = () => {
  return (
    <Box className="commitments" component="section">
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Box className="wrapper" component="div">
            <CreditCardIcon className="icon" />
            <Box className="info" component="div">
              <h2>Secured Payment</h2>
              <small>Safe & Fast</small>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className="wrapper" component="div">
            <ReturnIcon className="icon" />
            <Box className="info" component="div">
              <h2>Free Returns</h2>
              <small>Easy & Free</small>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className="wrapper" component="div">
            <ShippingIcon className="icon" />
            <Box className="info" component="div">
              <h2>Free Shipping</h2>
              <small>Orders over $199</small>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Commitments
