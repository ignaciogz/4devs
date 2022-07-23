import * as React from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'

import './styles.scss'

import finish from '../../assets/img/finish.png'

const OrderSuccess = () => {
  const { id } = useParams()

  return (
    <Box className="order-success" component="section">
      <Box className="order-success-container" component="div">
        <img alt="thank" src={finish} />
        <h1>THANKS !</h1>
        <p>Soon, you will recive an email with the order details.</p>
        <h2>Order ID #{id}</h2>
      </Box>
    </Box>
  )
}

export default OrderSuccess
