import React, {
  InputHTMLAttributes,
  ReactNode,
  Ref,
  forwardRef,
  useState,
  FocusEvent,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { FiAlertCircle } from 'react-icons/fi'
import { Container, Error } from './styles'
import { errorColor } from '../../styles/vars'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  ref?: Ref<HTMLInputElement>
  icon?: ReactNode
}

const Input: React.FC<Props> = forwardRef(({ icon, name, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const { errors } = useFormContext()
  const fieldError = errors[name]

  function handleBlur(event: FocusEvent<HTMLInputElement>): void {
    setIsFocused(false)
    setIsFilled(!!event.target.value)
  }

  return (
    <Container
      isFocused={isFocused}
      isFilled={isFilled}
      hasError={!!fieldError}
    >
      {icon}
      <input
        name={name}
        ref={ref}
        {...rest}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={handleBlur}
      />
      {fieldError && (
        <Error title={fieldError.message}>
          <FiAlertCircle color={errorColor} size={20} />
        </Error>
      )}
    </Container>
  )
})

export default Input
