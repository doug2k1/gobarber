import React from 'react'
import { Image } from 'react-native'
import { Container } from './styles'
import logoImg from '../../assets/logo.png'

const Signin: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
    </Container>
  )
}

export default Signin
