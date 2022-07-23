import { useState } from 'react'

import Service from '../services/orderService'

const useOrders = () => {
  const [orders, setOrders] = useState(null)
  const [order, setOrder] = useState(null)

  const getIDOrders = async (id) => {
    try {
      const result = await Service.getID(id)

      if (result.success) {
        const orderToShow = result.data.order

        setOrder(orderToShow)
      }

      return result.success
    } catch (error) {
      console.error(error)
    }
  }

  const getUserOrders = async () => {
    try {
      const result = await Service.getUserOrders()

      if (result.success) {
        const ordersToShow = result.data.orders

        setOrders(ordersToShow)
      }

      return result.success
    } catch (error) {
      console.error(error)
    }
  }

  return {
    order,
    orders,
    getIDOrders,
    getUserOrders,
  }
}

export default useOrders
