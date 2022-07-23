import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import './styles.scss'

const MODE_DEV = import.meta.env.VITE_ENV !== 'production'
const SERVER_DEV = import.meta.env.VITE_SERVER_URL_DEV
const SERVER_PROD = import.meta.env.VITE_SERVER_URL_PROD

const order = {
  id: 8461,
  date: '29/06/2022',
  user: {
    email: 'pepito@gmail.com',
    name: 'Pepe',
  },
  total: 2300,
  cartID: 14852,
}

const cart = [
  {
    product: {
      id: 1,
      name: 'Smart Chair',
      price: 870,
      img: 'http://localhost:3000/img/products/smart_chair.jpg',
      stock: 10,
    },
    qty: 2,
  },
  {
    product: {
      id: 4,
      name: 'Desk Go',
      price: 1100,
      img: 'http://localhost:3000/img/products/desk_go.jpg',
      stock: 5,
    },
    qty: 1,
  },
  {
    product: {
      id: 5,
      name: 'Extreme Click',
      price: 95,
      img: 'http://localhost:3000/img/products/extreme_click.jpg',
      stock: 25,
    },
    qty: 4,
  },
  {
    product: {
      id: 2,
      name: 'E Foot Rocker',
      price: 119,
      img: 'http://localhost:3000/img/products/foot_rocker.jpg',
      stock: 8,
    },
    qty: 1,
  },
]

const AdminPanelOrders = () => {
  function subtotalCol(item) {
    return item.product.price * item.qty
  }

  function createRow(item) {
    const subtotal = subtotalCol(item)
    const product = item.product

    return {
      img: product.img,
      name: product.name,
      price: product.price,
      qty: item.qty,
      subtotal,
    }
  }

  function createRows(cart) {
    return cart.map((item) => createRow(item))
  }

  const rows = createRows(cart)

  return (
    <Paper className="admin-panel-orders">
      <h1>Order: {order.id}</h1>
      <small>{order.date}</small>
      <Box className="admin-panel-orders-user" component="section">
        <ul>
          <li>
            <h3>Email: </h3>
            <p>{order.user.email}</p>
          </li>
          <li>
            <h3>Name: </h3>
            <p>{order.user.name}</p>
          </li>
        </ul>
      </Box>

      <Box className="admin-panel-orders-details" component="section">
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
            {rows.map((row, index) => (
              <TableRow key={index} className="table-content">
                <TableCell align="center" size="small">
                  <img
                    alt={`image of ${row.name}`}
                    src={`${MODE_DEV ? SERVER_DEV : SERVER_PROD}${row.img}`}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.qty}</TableCell>
                <TableCell align="right">${row.subtotal}</TableCell>
              </TableRow>
            ))}

            <TableRow className="table-footer">
              <TableCell colSpan={3} />
              <TableCell align="right">
                <h2>TOTAL</h2>
              </TableCell>
              <TableCell align="right">${order.total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default AdminPanelOrders
