import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { useForm, FormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

const Signin: React.FC = () => {
  const formMethods = useForm()
  const { signin } = useAuth()
  const { addToast } = useToast()

  async function onSubmit({
    email,
    password,
  }: Record<string, string>): Promise<void> {
    try {
      await signin({ email, password })
    } catch {
      addToast({
        title: 'Falha no login',
        type: 'error',
        message: 'Verifique o e-mail e senha informados',
      })
    }
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <FormContext {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <h1>Faça seu logon</h1>

            <Input
              name="email"
              icon={<FiMail />}
              type="email"
              placeholder="E-mail"
              ref={formMethods.register({
                required: 'Informe seu e-mail',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Informe um e-mail válido',
                },
              })}
            />
            <Input
              name="password"
              icon={<FiLock />}
              type="password"
              placeholder="Senha"
              ref={formMethods.register({ required: 'Informe sua senha' })}
            />
            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </form>
        </FormContext>

        <Link to="/signup">
          <FiLogIn />
          Criar conta
        </Link>
      </Content>

      <Background />
    </Container>
  )
}

export default Signin
