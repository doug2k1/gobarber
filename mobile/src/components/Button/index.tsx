import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'
import { Container, ButtonText } from './styles'

interface Props extends RectButtonProperties {
  children: string
}

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  )
}

export default Button
