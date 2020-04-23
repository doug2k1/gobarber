import styled from 'styled-components'
import { shade } from 'polished'
import { secondaryColor, bgColor } from '../../styles/vars'

export const Button = styled.button`
  background: ${secondaryColor};
  color: ${bgColor};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, secondaryColor)};
  }
`
