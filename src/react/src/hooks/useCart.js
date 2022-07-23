import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'
import Service from '../services/cartService'

const useCart = () => {
  const navigate = useNavigate()
  const { cart, setCart } = useContext(CartContext)
  const { isLogged } = useContext(AuthContext)

  const addCartItem = async (id_prod, qty, addMaxAvailable = true) => {
    try {
      const result = await Service.add(id_prod, qty, addMaxAvailable)

      if (result.success) {
        const cartUpdated = [...cart]
        const itemIndex = cart.findIndex((element) => element.product.id == id_prod)

        if (itemIndex !== -1) {
          let itemToUpdate = cart[itemIndex]

          itemToUpdate.qty += Number(qty)

          cartUpdated.splice(itemIndex, 1, itemToUpdate)
        } else {
          const item = {
            product: {
              id: id_prod,
            },
            qty: Number(qty),
          }

          cartUpdated.push(item)
        }

        setCart(cartUpdated)
      }

      return result
    } catch (error) {
      console.error(error)
    }
  }

  const checkout = async () => {
    try {
      const result = await Service.checkout()

      if (result.success) {
        setCart([])
        result.success && navigate(`/success/order/${result.data.id}`)
      } else {
        const cartUpdated = [...cart]

        const productsWithStockProblem = result.error.value

        for (const item of productsWithStockProblem) {
          let itemIndex = cart.findIndex((element) => element.product.id == item.id_prod)
          let itemToUpdate = cart[itemIndex]

          if (item.value == 0) {
            cartUpdated.splice(itemIndex, 1)
          } else {
            itemToUpdate.qty = Number(item.value)

            cartUpdated.splice(itemIndex, 1, itemToUpdate)
          }
        }

        setCart(cartUpdated)
      }

      return result
    } catch (error) {
      console.error(error)
    }
  }

  const getCart = async () => {
    try {
      const result = await Service.getCart()

      result.success && setCart(result.data.cart)

      return result.success
    } catch (error) {
      console.error(error)
    }
  }

  const getTotalItems = () => cart.reduce((a, b) => a + b.qty, 0)

  const updateCartItem = async (id_prod, qty, addMaxAvailable = true) => {
    try {
      const result = await Service.update(id_prod, qty, addMaxAvailable)

      if (result.success) {
        const cartUpdated = [...cart]
        const itemIndex = cart.findIndex((element) => element.product.id == id_prod)

        let itemToUpdate = cart[itemIndex]

        itemToUpdate.qty = Number(qty)

        cartUpdated.splice(itemIndex, 1, itemToUpdate)

        setCart(cartUpdated)
      } else {
        await getCart()
      }

      return result
    } catch (error) {
      console.error(error)
    }
  }

  const removeCartItem = async (id_prod) => {
    try {
      const result = await Service.remove(id_prod)

      if (result.success) {
        const cartModified = [...cart]
        const itemIndex = cart.findIndex((element) => element.product.id == id_prod)

        cartModified.splice(itemIndex, 1)

        setCart(cartModified)
      }

      return result.success
    } catch (error) {
      console.error(error)
    }
  }

  const getMaxQtyToAdd = (id_prod, productStock) => {
    const itemIndex = cart.findIndex((element) => element.product.id == id_prod)

    if (itemIndex !== -1) {
      let item = cart[itemIndex]

      return productStock - item.qty
    } else {
      return productStock
    }
  }

  const handleCartIconClick = () => (isLogged ? navigate('/cart') : navigate('/login'))

  const stopProp = (e) => e.stopPropagation()

  return {
    cart,
    addCartItem,
    checkout,
    getCart,
    getMaxQtyToAdd,
    getTotalItems,
    handleCartIconClick,
    removeCartItem,
    stopProp,
    updateCartItem,
  }
}

export default useCart
