import React, { createContext, useState, useContext } from 'react'
import api from '../services/api'

interface AuthState {
  token: string
  user: object
}

interface SigninCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: object
  signin(credentials: SigninCredentials): Promise<void>
  signout(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@goBarber:token')
    const user = localStorage.getItem('@goBarber:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  async function signin({ email, password }: SigninCredentials): Promise<void> {
    const response = await api.post('/sessions', {
      email,
      password,
    })

    const { token, user } = response.data
    localStorage.setItem('@goBarber:token', token)
    localStorage.setItem('@goBarber:user', JSON.stringify(user))
    setData({ token, user })
  }

  function signout(): void {
    localStorage.removeItem('@goBarber:token')
    localStorage.removeItem('@goBarber:user')
    setData({} as AuthState)
  }

  return (
    <AuthContext.Provider value={{ user: data.user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
