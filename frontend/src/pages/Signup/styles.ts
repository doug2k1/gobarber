import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'
import signupBackgroundImg from '../../assets/signup-background.jpg'
import { textColor } from '../../styles/vars'

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  overflow: hidden;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    color: ${textColor};
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, textColor)};
    }

    svg {
      margin-right: 16px;
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${signupBackgroundImg}) no-repeat;
  background-size: cover;
`
