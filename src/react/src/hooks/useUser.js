import { useContext } from 'react'

import UserContext from '../context/UserContext'
import Service from '../services/userService'

const useUser = () => {
  const { user, setUser } = useContext(UserContext)

  const checkUserExist = async ({ email }) => {
    try {
      const result = await Service.checkUserExist({ email })

      return result.data.user.exist
    } catch (error) {
      console.error(error)
    }
  }

  const getUserData = async () => {
    const result = await Service.getUserLogged()

    result.success && setUser({ ...result.data.user })
  }

  return {
    user,
    isAdmin: user && user.role === 'ADMIN',
    checkUserExist,
    getUserData,
  }
}

export default useUser
