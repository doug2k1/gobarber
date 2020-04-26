import React, { forwardRef, Ref, useState } from 'react'
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native'
import { useFormContext, Controller, ControllerProps } from 'react-hook-form'
import { Container, StyledTextInput, StyledIcon } from './styles'

interface Props extends Omit<ControllerProps<typeof StyledTextInput>, 'as'> {
  icon: string
  ref?: Ref<TextInput>
}

const Input: React.FC<Props> = forwardRef(({ name, icon, ...rest }, ref) => {
  const { errors } = useFormContext()
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const fieldError = errors[name]

  function handleFocus(): void {
    console.log('handleFocus')
    setIsFocused(true)
  }

  function handleBlur(
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ): void {
    setIsFocused(false)
    setIsFilled(!!event.nativeEvent.text)
  }

  return (
    <Container isFocused={isFocused} hasError={!!fieldError}>
      <StyledIcon
        name={icon}
        size={20}
        isFilled={isFilled}
        isFocused={isFocused}
      />

      <Controller
        name={name}
        as={
          <StyledTextInput
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        }
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  )
})

export default Input
