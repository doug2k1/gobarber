import React, { createContext, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
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
  loading: boolean
  signin(credentials: SigninCredentials): Promise<void>
  signout(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const storageData = await AsyncStorage.multiGet([
        '@goBarber:token',
        '@goBarber:user',
      ])
      const storageObject: Record<string, string> = storageData.reduce(
        (prev, current) => {
          return { ...prev, [current[0]]: current[1] }
        },
        {}
      )

      const { token, user } = {
        token: storageObject['@goBarber:token'],
        user: JSON.parse(storageObject['@goBarber:user']),
      }

      if (token && user) {
        setData({ token, user })
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  async function signin({ email, password }: SigninCredentials): Promise<void> {
    const response = await api.post('/sessions', {
      email,
      password,
    })

    const { token, user } = response.data
    await AsyncStorage.multiSet([
      ['@goBarber:token', token],
      ['@goBarber:user', JSON.stringify(user)],
    ])
    setData({ token, user })
  }

  async function signout(): Promise<void> {
    await AsyncStorage.multiRemove(['@goBarber:token', '@goBarber:user'])
    setData({} as AuthState)
  }

  return (
    <AuthContext.Provider value={{ user: data.user, signin, signout, loading }}>
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
