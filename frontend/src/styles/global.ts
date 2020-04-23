import { createGlobalStyle } from 'styled-components'
import { bgColor, textColor } from './vars'

export const GlobalStyle = createGlobalStyle`
  * { 
    margin: 0; 
    padding: 0; 
    outline:0; 
    box-sizing: border-box;
  }

  body {
    background: ${bgColor};
    color: ${textColor};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 400 16px "Roboto Slab", serif;
  }

  button {
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
`
