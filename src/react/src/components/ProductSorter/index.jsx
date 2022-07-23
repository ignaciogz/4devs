import React, { useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import './styles.scss'

import useProducts from '../../hooks/useProducts'

const ProductSorter = ({ setProductsFiltered }) => {
  const { sortProducts } = useProducts()
  const [sortValue, setSortValue] = useState('')

  const handleSortValueChange = (event) => {
    const sorterValue = event.target.value

    setSortValue(sorterValue)

    const productsSortered = sortProducts(sorterValue)

    setProductsFiltered(productsSortered)
  }

  return (
    <Box className="productSorter" component="section">
      <small>Sorted by:</small>
      <FormControl size="small" sx={{ minWidth: 120 }} variant="standard">
        <Select
          id="sorted-by"
          label="sorted-by"
          labelId="sorted-by-label"
          value={sortValue}
          onChange={handleSortValueChange}
        >
          <MenuItem value={'name-ASC'}>NAME, A-Z</MenuItem>
          <MenuItem value={'name-DESC'}>NAME, Z-A</MenuItem>
          <MenuItem value={'price-ASC'}>PRICE, Low to High</MenuItem>
          <MenuItem value={'price-DESC'}>PRICE, High to Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default ProductSorter
