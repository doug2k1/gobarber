import React, { useRef } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { useForm, FormContext } from 'react-hook-form'
import { Container, Title, BackToSignin, BackToSigninText } from './styles'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { textColor } from '../../styles/vars'

const Signup: React.FC = () => {
  const navigation = useNavigation()
  const formMethods = useForm()
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  async function onSubmit({
    name,
    email,
    password,
  }: Record<string, string>): Promise<void> {
    console.log(name, email, password)
    Alert.alert('Falha no cadastro', 'Por favor, tente novamente mais tarde.')
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
              <Title>Crie sua conta</Title>
            </View>

            <FormContext {...formMethods}>
              <Input
                control={formMethods.control}
                name="name"
                onChange={(args) => args[0].nativeEvent.text}
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                autoCapitalize="words"
                rules={{
                  required: 'Informe seu nome',
                }}
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                control={formMethods.control}
                name="email"
                onChange={(args) => args[0].nativeEvent.text}
                icon="mail"
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
                ref={emailInputRef}
              />
              <Input
                control={formMethods.control}
                name="password"
                onChange={(args) => args[0].nativeEvent.text}
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                rules={{ required: 'Informe uma senha' }}
                onSubmitEditing={formMethods.handleSubmit(onSubmit)}
                ref={passwordInputRef}
              />

              <Button onPress={formMethods.handleSubmit(onSubmit)}>
                Cadastrar
              </Button>
            </FormContext>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignin onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={textColor} />
        <BackToSigninText>Voltar para o logon</BackToSigninText>
      </BackToSignin>
    </>
  )
}

export default Signup
