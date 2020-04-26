import React, { useRef } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { useForm, FormContext } from 'react-hook-form'
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
  const passwordInputRef = useRef<TextInput>(null)

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
              <Input
                name="email"
                icon="mail"
                control={formMethods.control}
                onChange={(args) => args[0].nativeEvent.text}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                rules={{
                  required: 'Informe seu e-mail',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Informe um e-mail válido',
                  },
                }}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                name="password"
                icon="lock"
                ref={passwordInputRef}
                control={formMethods.control}
                onChange={(args) => args[0].nativeEvent.text}
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                rules={{ required: 'Informe sua senha' }}
                onSubmitEditing={formMethods.handleSubmit(onSubmit)}
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
