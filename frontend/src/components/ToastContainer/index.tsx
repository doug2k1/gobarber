import React from 'react'
import { useTransition } from 'react-spring'
import { Container } from './styles'
import Toast from './Toast'

interface ToastData {
  id: string
  title: string
  type?: 'error' | 'success' | 'info'
  message?: string
}

interface Props {
  toasts: ToastData[]
}

const ToastContainer: React.FC<Props> = ({ toasts }) => {
  const toastsWithTransition = useTransition(
    toasts,
    (toast: ToastData) => toast.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    }
  )

  return (
    <Container>
      {toastsWithTransition.map(({ item, key, props }) => (
        <Toast
          key={key}
          style={props}
          id={item.id}
          type={item.type}
          title={item.title}
          message={item.message}
        />
      ))}
    </Container>
  )
}

export default ToastContainer
