import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { useForm, FormContext } from 'react-hook-form'
import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Signin: React.FC = () => {
  const formMethods = useForm()

  function onSubmit(data: object): void {
    console.log(data)
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

        <a href="signup">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  )
}

export default Signin
