import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import './styles.scss'

import useProducts from '../../hooks/useProducts'
import useUtilities from '../../hooks/useUtilities'

const ProductFilters = ({ categories, brands, setProductsFiltered }) => {
  const { filterProducts } = useProducts()
  const { getIconButtonTarget } = useUtilities()

  const [brandFilterValue, setBrandFilterValue] = useState(null)
  const [categoryFilterValue, setCategoryFilterValue] = useState(null)
  const [priceFilterValue, setPriceFilterValue] = useState('All')

  const handleBrandFilterClick = (event) => {
    const brandValue = event.target.value

    setBrandFilterValue(brandValue)
    const productsFiltered = filterProducts(brandValue, categoryFilterValue, priceFilterValue)

    setProductsFiltered(productsFiltered)
  }

  const handleCategoryFilterClick = (event) => {
    const categoryValue = event.target.value

    setCategoryFilterValue(categoryValue)
    const productsFiltered = filterProducts(brandFilterValue, categoryValue, priceFilterValue)

    setProductsFiltered(productsFiltered)
  }

  const handlePriceFilterChange = (event) => {
    const priceValue = event.target.value

    setPriceFilterValue(priceValue)
    const productsFiltered = filterProducts(brandFilterValue, categoryFilterValue, priceValue)

    setProductsFiltered(productsFiltered)
  }

  const handleClearFilterClick = (event) => {
    let productsFiltered
    const target = getIconButtonTarget(event.target)
    const filterToClear = target.value

    switch (filterToClear) {
      case 'brandFilter':
        productsFiltered = filterProducts(null, categoryFilterValue, priceFilterValue)

        setProductsFiltered(productsFiltered)
        setBrandFilterValue(null)
        break

      case 'categoryFilter':
        productsFiltered = filterProducts(brandFilterValue, null, priceFilterValue)

        setProductsFiltered(productsFiltered)
        setCategoryFilterValue(null)
        break
    }
  }

  return (
    <Box className="productFilters" component="section">
      <Box className="productsFilter-header" component="div">
        <h3>Categories</h3>
        {categoryFilterValue && (
          <IconButton
            aria-label="remove category filter"
            size="small"
            title="remove category filter"
            value="categoryFilter"
            onClick={handleClearFilterClick}
          >
            <FilterAltOffIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {categories.length > 0 ? (
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <Button value={category.id} variant="text" onClick={handleCategoryFilterClick}>
                {category.name}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <img alt="Próximamente..." className="soon" src={soon} />
      )}
      <Divider className="divider" />

      <h3>Price</h3>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="All"
          name="radio-buttons-group"
          value={priceFilterValue}
          onChange={handlePriceFilterChange}
        >
          <FormControlLabel
            control={<Radio className="radio-btn" size="small" />}
            label="All"
            value="All"
          />
          <FormControlLabel
            control={<Radio className="radio-btn" size="small" />}
            label="Below $100.00"
            value="SubGroup-1"
          />
          <FormControlLabel
            control={<Radio className="radio-btn" size="small" />}
            label="$100.00 - $199.00"
            value="SubGroup-2"
          />
          <FormControlLabel
            control={<Radio className="radio-btn" size="small" />}
            label="$200.00 - $299.00"
            value="SubGroup-3"
          />
          <FormControlLabel
            control={<Radio className="radio-btn" size="small" />}
            label="Below $500.00"
            value="SubGroup-4"
          />
          <FormControlLabel
            control={<Radio className="radio-btn" size="small" />}
            label="Above $500.00"
            value="SubGroup-5"
          />
        </RadioGroup>
      </FormControl>
      <Divider className="divider" />

      <Box className="productsFilter-header" component="div">
        <h3>Brands</h3>
        {brandFilterValue && (
          <IconButton
            aria-label="remove brand filter"
            size="small"
            title="remove brand filter"
            value="brandFilter"
            onClick={handleClearFilterClick}
          >
            <FilterAltOffIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      {brands.length > 0 ? (
        <ul>
          {brands.map((brand, index) => (
            <li key={index}>
              <Button value={brand.id} variant="text" onClick={handleBrandFilterClick}>
                {brand.name}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <img alt="Próximamente..." className="soon" src={soon} />
      )}
    </Box>
  )
}

export default ProductFilters
