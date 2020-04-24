import React from 'react'
import { GlobalStyle } from './styles/global'
import Signup from './pages/Signup'

const App: React.FC = () => {
  return (
    <>
      <Signup />
      <GlobalStyle />
    </>
  )
}

export default App
