import React, { useEffect } from 'react'
import { FiAlertCircle, FiXCircle, FiInfo, FiCheckCircle } from 'react-icons/fi'
import { Container } from './styles'
import { useToast } from '../../../hooks/toast'

interface Props {
  id: string
  type?: 'error' | 'success' | 'info'
  title: string
  message?: string
  style?: object
}

const icons = {
  info: <FiInfo size={20} />,
  success: <FiCheckCircle size={20} />,
  error: <FiAlertCircle size={20} />,
}

const Toast: React.FC<Props> = ({
  id,
  type = 'info',
  title,
  message,
  style,
}) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, 3000)

    return function cleanup() {
      clearTimeout(timer)
    }
  }, [id, removeToast])

  return (
    <Container type={type} hasMessage={!!message} style={style}>
      {icons[type]}
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>

      <button type="button" onClick={() => removeToast(id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast
