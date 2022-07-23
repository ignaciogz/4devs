import React, { createContext, useState } from 'react'

const ProductsContext = createContext({})

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null)

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export { ProductsProvider }
export default ProductsContext
