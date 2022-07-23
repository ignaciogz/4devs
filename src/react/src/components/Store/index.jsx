import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'

import './styles.scss'

import ProductCard from '../ProductCard'
import ProductFilters from '../ProductFilters'
import ProductSorter from '../ProductSorter'

const Store = ({ brands, categories, products }) => {
  const [productsFiltered, setProductsFiltered] = useState(products)

  return (
    <Box className="store" component="section">
      <h1>4DEVS Shop</h1>
      <Toolbar id="back-to-top-anchor" />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ProductFilters
            brands={brands}
            categories={categories}
            setProductsFiltered={setProductsFiltered}
          />
        </Grid>
        <Grid item xs={9}>
          <ProductSorter setProductsFiltered={setProductsFiltered} />

          <Grid container className="products-grid" spacing={1}>
            {productsFiltered.length > 0 ? (
              productsFiltered.map(
                (item, index) => item.stock > 0 && <ProductCard key={index} {...item} />,
              )
            ) : (
              <Box className="no-producs-with-filter" component="small">
                We do not have products with the selected filters
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Store
