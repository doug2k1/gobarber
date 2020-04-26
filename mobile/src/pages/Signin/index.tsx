import React from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller, FormContext } from 'react-hook-form'
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
} from './styles'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { secondaryColor } from '../../styles/vars'

const Signin: React.FC = () => {
  const navigation = useNavigation()
  const formMethods = useForm()

  async function onSubmit({
    email,
    password,
  }: Record<string, string>): Promise<void> {
    console.log(email, password)
  }

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
              <Title>Faça seu logon</Title>
            </View>

            <FormContext {...formMethods}>
              <Controller
                as={Input}
                control={formMethods.control}
                name="email"
                onChange={(args) => args[0].nativeEvent.text}
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
              />
              <Controller
                as={Input}
                control={formMethods.control}
                name="password"
                onChange={(args) => args[0].nativeEvent.text}
                icon="lock"
                placeholder="Senha"
                secureTextEntry
              />

              <Button onPress={formMethods.handleSubmit(onSubmit)}>
                Entrar
              </Button>
            </FormContext>
            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('Signup')}>
        <Icon name="log-in" size={20} color={secondaryColor} />
        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccountButton>
    </>
  )
}

export default Signin
