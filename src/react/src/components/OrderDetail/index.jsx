import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import './styles.scss'

import useOrders from '../../hooks/useOrders'
import useUtilities from '../../hooks/useUtilities'

const MODE_DEV = import.meta.env.VITE_ENV !== 'production'
const SERVER_DEV = import.meta.env.VITE_SERVER_URL_DEV
const SERVER_PROD = import.meta.env.VITE_SERVER_URL_PROD

const OrderDetail = () => {
  const { id } = useParams()
  const { order, getIDOrders } = useOrders()
  const { formatPrice } = useUtilities()
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)

  async function getOrder(id) {
    const success = await getIDOrders(id)

    if (success) {
      setLoader(false)
    } else {
      setTimeout(() => {
        navigate('/error404')
      }, 1500)
    }
  }

  useEffect(() => {
    getOrder(id)
  }, [id])

  function subtotalCol(item) {
    return item.price * item.qty
  }

  function createRow(item) {
    const subtotal = subtotalCol(item)

    return {
      img: item.img,
      name: item.name,
      price: item.price,
      qty: item.qty,
      subtotal,
    }
  }

  function createRows(order) {
    return order.map((item) => createRow(item))
  }

  function calculateTotal(items) {
    return items.reduce((a, b) => a + b.subtotal, 0)
  }

  const orderRows = !loader && order ? createRows(order.items) : []
  const orderTotal = !loader && order ? calculateTotal(orderRows) : 0

  const steps = ['Paid out', 'Order generated', 'New email order sent']

  function createBackButton(route) {
    return (
      <Button aria-label={`go back`} component={Link} title="Go back" to={route} variant="text">
        <ArrowBackIcon />
      </Button>
    )
  }

  return (
    <Box className="order-detail" component="section">
      {loader ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <Paper>
          {createBackButton('/orders')}
          <h1>Order ID: #{order.id}</h1>
          <small>{order.timestamp}</small>
          <Box className="order-detail-user" component="section">
            <ul>
              <li>
                <h3>Email: </h3>
                <p>{order.client.email}</p>
              </li>
              <li>
                <h3>Name: </h3>
                <p>{order.client.name}</p>
              </li>
            </ul>
          </Box>

          <Box className="order-detail-status" component="section">
            <Stepper alternativeLabel activeStep={3}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box className="order-detail-details" component="section">
            <h2>DETAILS</h2>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderRows.map((row, index) => (
                  <TableRow key={index} className="table-content">
                    <TableCell align="center" size="small">
                      <img
                        alt={`image of ${row.name}`}
                        src={`${MODE_DEV ? SERVER_DEV : SERVER_PROD}${row.img}`}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{formatPrice(row.price)}</TableCell>
                    <TableCell>{row.qty}</TableCell>
                    <TableCell align="right">{formatPrice(row.subtotal)}</TableCell>
                  </TableRow>
                ))}

                <TableRow className="table-footer">
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <h2>TOTAL</h2>
                  </TableCell>
                  <TableCell align="right">{formatPrice(orderTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  )
}

export default OrderDetail
