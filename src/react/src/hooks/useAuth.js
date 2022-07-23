import { useContext } from 'react'

import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'
import UserContext from '../context/UserContext'
import Service from '../services/authService'

import useCart from './useCart'
import useUser from './useUser'

const useAuth = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext)
  const { setCart } = useContext(CartContext)
  const { setUser, userDataLoaded, setUserDataLoaded } = useContext(UserContext)
  const { isAdmin, getUserData } = useUser()
  const { getCart } = useCart()

  const loginUserNow = async () => {
    await getUserData()
    await getCart()
    setUserDataLoaded(true)
    setIsLogged(true)
  }

  const logout = () => {
    setUser(null)
    setCart([])
    setUserDataLoaded(false)
    setIsLogged(false)
  }

  const checkLoggedIn = async () => {
    const result = await Service.checkLoggedIn()

    if (result.success) {
      if (!result.data.isLogged) {
        logout()

        return false
      }

      if (result.data.isLogged && !userDataLoaded) {
        await loginUserNow()
      }

      return true
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    const result = await Service.logout()

    result.success && logout()
  }

  const login = async ({ username, password }) => {
    try {
      const result = await Service.login({ username, password })

      if (result.success) {
        await loginUserNow()
      }

      return result.success
    } catch (error) {
      console.error(error)
    }
  }

  const register = async (formData) => {
    try {
      const result = await Service.register(formData)

      if (result.success) {
        await loginUserNow()
      }

      return result.success
    } catch (error) {
      console.error(error)
    }
  }

  return {
    isAuthAdmin: isLogged && isAdmin,
    isLogged,
    checkLoggedIn,
    handleLogout,
    login,
    register,
  }
}

export default useAuth
