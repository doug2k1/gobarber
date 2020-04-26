import React from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { useForm, FormContext } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/api'
import { useToast } from '../../hooks/toast'

const Signup: React.FC = () => {
  const formMethods = useForm()
  const { addToast } = useToast()
  const history = useHistory()

  async function onSubmit({
    name,
    email,
    password,
  }: Record<string, string>): Promise<void> {
    try {
      await api.post('/users', { name, email, password })

      history.push('/')
      addToast({
        title: 'Cadastro realizado',
        type: 'success',
        message: 'Você já pode fazer seu logon',
      })
    } catch (error) {
      addToast({
        title: 'Falha no cadastro',
        type: 'error',
        message: error.message,
      })
    }
  }

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <FormContext {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <h1>Faça seu cadastro</h1>

            <Input
              icon={<FiUser />}
              name="name"
              type="text"
              placeholder="Nome"
              ref={formMethods.register({ required: 'Informe seu nome' })}
            />

            <Input
              icon={<FiMail />}
              name="email"
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
              icon={<FiLock />}
              name="password"
              type="password"
              placeholder="Senha"
              ref={formMethods.register({ required: 'Informe uma senha' })}
            />

            <Button type="submit">Cadastrar</Button>
          </form>
        </FormContext>

        <Link to="/">
          <FiArrowLeft />
          Voltar para o logon
        </Link>
      </Content>
    </Container>
  )
}

export default Signup
