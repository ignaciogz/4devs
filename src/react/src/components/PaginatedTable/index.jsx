import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import OpenIcon from '@mui/icons-material/OpenInNew'

import ModalAlert from '../ModalAlert'
import ModalForm from '../ModalForm'

import './styles.scss'

import useUtilities from '../../hooks/useUtilities'

const tableName = {
  products: {
    text: 'products',
    span: 5,
  },
  categories: {
    text: 'categories',
    span: 2,
  },
  users: {
    text: 'users',
    span: 4,
  },
  orders: {
    text: 'orders',
    span: 6,
  },
}

// ↓ ****** START - FACTORY ****** ↓
function createData(data, tableName) {
  return data.map((item) => createDataFactory[tableName](item))
}

function calculateTotal(items) {
  return items.reduce((a, b) => a + b.price * b.qty, 0)
}

function calculateQty(items) {
  return items.reduce((a, b) => a + b.qty, 0)
}

const createDataFactory = {
  products: createProductsData,
  categories: createCategoriesData,
  users: createUsersData,
  orders: createOrdersData,
  user_orders: createUserOrdersData,
}

const createActions = (id, text) => {
  return (
    <>
      <ModalForm action="edit" id={id} variant="text" />
      <ModalAlert action="delete" id={id} textDialog={text} variant="text" />
    </>
  )
}

const createViewAction = (id) => {
  return (
    <Button data-id={id} value="open" variant="text">
      <OpenIcon />
    </Button>
  )
}

const createViewPageAction = (id, route) => {
  return (
    <Button aria-label={`go to ID ${id}`} component={Link} to={route} variant="text">
      <OpenIcon />
    </Button>
  )
}
// ↑ ****** END - FACTORY ****** ↑

// ↓ ****** START - DTOS ****** ↓
function createProductsData({ id, category, name, price, stock }) {
  const text = `the product with id: ${id}`
  let actions = createActions(id, text)

  return { id, category, name, price, stock, actions }
}

function createCategoriesData({ id, name }) {
  const text = `the category with id: ${id}`
  let actions = createActions(id, text)

  return { id, name, actions }
}

function createUsersData({ id, email, name, role }) {
  const text = `the user with id: ${id}`
  let actions = createActions(id, text)

  return { id, email, name, role, actions }
}

function createOrdersData({ id, date, email, name, total }) {
  let actions = createViewAction(id)

  return { id, date, email, name, total, actions }
}

function createUserOrdersData({ id, timestamp, items }) {
  let actions = createViewPageAction(id, `/order/${id}`)
  let qty = calculateQty(items)
  let total = calculateTotal(items)

  return { id, timestamp, qty, total, actions }
}
// ↑ ****** END - DTOS ****** ↑

const PaginatedTable = ({ data, dataName, title, cpanel }) => {
  const { formatPrice } = useUtilities()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(7)

  const columns = {
    products: [
      { id: 'id', label: 'ID', width: 70 },
      { id: 'category', label: 'Category', minWidth: 100 },
      {
        id: 'name',
        label: 'Name',
        minWidth: 100,
        align: 'right',
      },
      {
        id: 'price',
        label: 'Price',
        minWidth: 100,
        align: 'right',
        format: (value) => formatPrice(value),
      },
      {
        id: 'stock',
        label: 'Stock',
        minWidth: 100,
        align: 'right',
      },
      {
        id: 'actions',
        label: '',
        width: 160,
        align: 'right',
      },
    ],
    categories: [
      { id: 'id', label: 'ID', width: 70 },
      { id: 'name', label: 'Name', minWidth: 100 },
      {
        id: 'actions',
        label: '',
        width: 160,
        align: 'right',
      },
    ],
    users: [
      { id: 'id', label: 'ID', width: 70 },
      { id: 'email', label: 'Email', minWidth: 100 },
      {
        id: 'name',
        label: 'Name',
        minWidth: 100,
        align: 'right',
      },
      {
        id: 'role',
        label: 'Role',
        minWidth: 100,
        align: 'right',
      },
      {
        id: 'actions',
        label: '',
        width: 160,
        align: 'right',
      },
    ],
    orders: [
      { id: 'id', label: 'ID', width: 70 },
      { id: 'date', label: 'Date', minWidth: 100 },
      { id: 'email', label: 'Email', minWidth: 100 },
      {
        id: 'name',
        label: 'Name',
        minWidth: 100,
        align: 'right',
      },
      {
        id: 'total',
        label: 'Total',
        minWidth: 100,
        align: 'right',
        format: (value) => formatPrice(value),
      },
      {
        id: 'actions',
        label: '',
        width: 160,
        align: 'right',
      },
    ],
    user_orders: [
      { id: 'id', label: 'ID', width: 70 },
      { id: 'timestamp', label: 'Date', width: 170 },
      {
        id: 'qty',
        label: 'Quantity',
        width: 90,
        format: (value) => (value == 1 ? `${value} unit` : `${value} units`),
      },
      {
        id: 'total',
        label: 'Total',
        align: 'right',
        format: (value) => formatPrice(value),
      },
      {
        id: 'actions',
        label: '',
        width: 160,
        align: 'right',
      },
    ],
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const tableRows = data ? createData(data, dataName) : []
  const sxObj = cpanel ? { maxHeight: 440 } : {}

  return (
    <Box className="paginated-table" component="section">
      {!cpanel && (
        <Box className="paginated-table-header">
          <h1>{title}</h1>
          {dataName != 'user_orders' && <ModalForm action="add" text="ADD ITEM" variant="text" />}
        </Box>
      )}

      {tableRows.length > 0 ? (
        <Paper>
          <TableContainer sx={sxObj}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                {cpanel && (
                  <TableRow>
                    <TableCell className="table-name" colSpan={tableName[dataName].span}>
                      <h1>{tableName[dataName].text.toUpperCase()}</h1>
                    </TableCell>
                    {dataName !== 'orders' && (
                      <TableCell align="right" className="table-name">
                        <ModalForm action="add" text="NEW" variant="text" />
                      </TableCell>
                    )}
                  </TableRow>
                )}
                <TableRow>
                  {columns[dataName].map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        width: column.width,
                        maxWidth: column.maxWidth,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                        {columns[dataName].map((column) => {
                          const value = row[column.id]

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={tableRows.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[7, 14, 21]}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Box>No items to show</Box>
      )}
    </Box>
  )
}

export default PaginatedTable
