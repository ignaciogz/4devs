import { useContext, useState } from 'react'

import Service from '../services/productService'
import ProductsContext from '../context/ProductsContext'

import useUtilities from './useUtilities'

const useProducts = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { filter } = useUtilities()
  const [product, setProduct] = useState(null)

  const getAll = async () => {
    try {
      const result = await Service.getAll()

      if (result.success) {
        const productsToShow = result.data.products

        setProducts(productsToShow)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getID = async (id) => {
    try {
      const result = await Service.getID(id)

      if (result.success) {
        const productToShow = result.data.product

        productToShow.description = productToShow.description.split(';')

        setProduct(productToShow)
      }

      return result
    } catch (error) {
      console.error(error)
    }
  }

  const filterProducts = (brandFilterValue, categoryFilterValue, priceFilterValue) => {
    let productsToShow = [...products]

    brandFilterValue && (productsToShow = filterBrand(productsToShow, brandFilterValue))
    categoryFilterValue && (productsToShow = filterCategory(productsToShow, categoryFilterValue))
    priceFilterValue && (productsToShow = filterPrice(productsToShow, priceFilterValue))

    return productsToShow
  }

  const filterBrand = (array, brandFilterValue) => filter(array, 'brand', brandFilterValue)

  const filterCategory = (array, categoryFilterValue) =>
    filter(array, 'category', categoryFilterValue)

  const filterPrice = (array, priceFilterValue) => {
    switch (priceFilterValue) {
      case 'All':
        return array
      case 'SubGroup-1':
        return array.filter((element) => element['price'] < 100)
      case 'SubGroup-2':
        return array.filter((element) => element['price'] >= 100 && element['price'] < 200)
      case 'SubGroup-3':
        return array.filter((element) => element['price'] >= 200 && element['price'] < 300)
      case 'SubGroup-4':
        return array.filter((element) => element['price'] < 500)
      case 'SubGroup-5':
        return array.filter((element) => element['price'] >= 500)
    }
  }

  const sortProducts = (sorterValue) => {
    let productsSorted = [...products]
    const [by, order] = sorterValue.split('-')

    by === 'name' && productsSorted.sort((a, b) => a.name.localeCompare(b.name))
    by === 'price' && productsSorted.sort((a, b) => a.price - b.price)
    order === 'DESC' && productsSorted.reverse()

    setProducts(productsSorted)

    return productsSorted
  }

  return {
    product,
    products,
    getAll,
    getID,
    filterProducts,
    sortProducts,
  }
}

export default useProducts
