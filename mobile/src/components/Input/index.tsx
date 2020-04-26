import React from 'react'
import { TextInputProps } from 'react-native'
import { Container, StyledTextInput, StyledIcon } from './styles'

interface Props extends TextInputProps {
  name: string
  icon: string
}

const Input: React.FC<Props> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <StyledIcon name={icon} size={20} color="#666360" />

      <StyledTextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  )
}

export default Input
