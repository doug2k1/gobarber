import React, { forwardRef, Ref } from 'react'
import { TextInput } from 'react-native'
import { useFormContext, Controller, ControllerProps } from 'react-hook-form'
import { Container, StyledTextInput, StyledIcon } from './styles'

interface Props extends Omit<ControllerProps<typeof StyledTextInput>, 'as'> {
  icon: string
  ref?: Ref<TextInput>
}

const Input: React.FC<Props> = forwardRef(({ name, icon, ...rest }, ref) => {
  const { errors } = useFormContext()
  const fieldError = errors[name]
  console.log(name, fieldError)

  return (
    <Container>
      <StyledIcon name={icon} size={20} color="#666360" />

      <Controller
        name={name}
        as={<StyledTextInput ref={ref} />}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  )
})

export default Input
