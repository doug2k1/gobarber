import styled from 'styled-components'
import { textColor, structureDark } from '../../styles/vars'

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${structureDark};
  border-radius: 10px;
  border: 2px solid ${structureDark};
  width: 100%;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    color: ${textColor};
    background: none;
    border: 0;
    padding: 16px;

    &::placeholder {
    }
  }

  svg {
    margin-left: 16px;
  }
`
