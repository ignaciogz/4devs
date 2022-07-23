import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import './styles.scss'

const CartDetailQty = ({ item, handleChange }) => {
  return (
    <Box>
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        className="units-to-add"
        color="warning"
        defaultValue={item.qty}
        id={`${item.product.id}`}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: item.product.stock }}
        label="Units to add"
        type="number"
        variant="standard"
        onChange={handleChange}
      />
    </Box>
  )
}

export default CartDetailQty
