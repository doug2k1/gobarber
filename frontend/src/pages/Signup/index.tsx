import React from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Signup: React.FC = () => {
  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form>
          <h1>Faça seu cadastro</h1>

          <Input icon={<FiUser />} type="text" placeholder="Nome" />
          <Input icon={<FiMail />} type="email" placeholder="E-mail" />
          <Input icon={<FiLock />} type="password" placeholder="Senha" />
          <Button type="submit">Cadastrar</Button>
        </form>

        <a href="signup">
          <FiArrowLeft />
          Voltar para o logon
        </a>
      </Content>
    </Container>
  )
}

export default Signup
