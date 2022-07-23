import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import Store from '../Store'
import useBrands from '../../hooks/useBrands'
import useCategories from '../../hooks/useCategories'
import useProducts from '../../hooks/useProducts'

const StoreContainer = () => {
  const { brands, getAllBrands } = useBrands()
  const { products, getAll } = useProducts()
  const { categories, getAllCategories } = useCategories()
  const [loader, setLoader] = useState(true)

  async function getProducts() {
    await getAllBrands()
    await getAllCategories()
    await getAll()
    setLoader(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Box>
      {loader ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <Store brands={brands} categories={categories} products={products} />
      )}
    </Box>
  )
}

export default StoreContainer
