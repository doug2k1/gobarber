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
import { Container, Title, BackToSignin, BackToSigninText } from './styles'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { textColor } from '../../styles/vars'

const Signup: React.FC = () => {
  const navigation = useNavigation()
  const formMethods = useForm()

  async function onSubmit({
    name,
    email,
    password,
  }: Record<string, string>): Promise<void> {
    console.log(name, email, password)
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
              <Controller
                as={Input}
                control={formMethods.control}
                name="name"
                onChange={(args) => args[0].nativeEvent.text}
                icon="user"
                placeholder="Nome"
              />
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
