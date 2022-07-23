import React, { createContext, useState } from 'react'

const UserContext = createContext({})

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userDataLoaded, setUserDataLoaded] = useState(false)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userDataLoaded,
        setUserDataLoaded,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider }
export default UserContext
