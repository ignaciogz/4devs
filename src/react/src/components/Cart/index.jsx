import * as React from 'react'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const Cart = ({ itemsQty }) => {
  return (
    <Badge badgeContent={itemsQty}>
      <ShoppingCartIcon />
    </Badge>
  )
}

export default Cart
