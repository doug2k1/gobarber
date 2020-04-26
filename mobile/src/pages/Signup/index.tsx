import React from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Container, Title, BackToSignin, BackToSigninText } from './styles'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { secondaryColor, textColor } from '../../styles/vars'

const Signup: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignin>
        <Icon name="arrow-left" size={20} color={textColor} />
        <BackToSigninText>Voltar para o logon</BackToSigninText>
      </BackToSignin>
    </>
  )
}

export default Signup
