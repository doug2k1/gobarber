import React, { createContext, useContext, useState } from 'react'
import { uuid } from 'uuidv4'
import ToastContainer from '../components/ToastContainer'

interface ToastData {
  id: string
  title: string
  type?: 'error' | 'success' | 'info'
  message?: string
}

interface ToastContextData {
  addToast(toast: Omit<ToastData, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

export const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  function addToast({ title, type, message }: Omit<ToastData, 'id'>): void {
    const id = uuid()
    const toast = { id, title, type, message }
    setToasts([...toasts, toast])
  }

  function removeToast(id: string): void {
    setToasts([...toasts.filter((t) => t.id !== id)])
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}
