import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import './styles.scss'

import PaginatedTable from '../paginatedTable'
import useOrders from '../../hooks/useOrders'

const UserOrders = () => {
  const { orders, getUserOrders } = useOrders()
  const [loader, setLoader] = useState(true)

  async function getOrders() {
    const success = await getUserOrders()

    success && setLoader(false)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <Box className="user-orders" component="section">
      {loader ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <PaginatedTable cpanel={false} data={orders} dataName="user_orders" title="User Orders" />
      )}
    </Box>
  )
}

export default UserOrders
