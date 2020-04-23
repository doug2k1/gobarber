import React, { InputHTMLAttributes, ReactNode } from 'react'
import { Container } from './styles'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
}

const Input: React.FC<Props> = ({ icon, ...rest }) => {
  return (
    <Container>
      {icon}
      <input {...rest} />
    </Container>
  )
}

export default Input
