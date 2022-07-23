import React from 'react'

import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ProductsProvider } from './context/ProductsContext'
import { UserProvider } from './context/UserContext'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
