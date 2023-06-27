import { createContext, useContext, useEffect, useState } from "react"

export const CurrentUserContext = createContext()
export const UseCurrentUserContext = () => useContext(CurrentUserContext)

export function AppContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    const tokenFromLS = localStorage.getItem("token")
    return tokenFromLS || ""
  })

  const [email, setEmail] = useState(() => {
    const emailFromLS = localStorage.getItem("email")
    return emailFromLS || ""
  })

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  })

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  useEffect(() => {
    localStorage.setItem("email", email)
  }, [email])

  return (
    <CurrentUserContext.Provider
      value={{ token, setToken, email, setEmail, currentUser, setCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}
