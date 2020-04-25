import styled, { css } from 'styled-components'
import {
  textColor,
  structureDark,
  secondaryColor,
  errorColor,
} from '../../styles/vars'
import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  hasError: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background: ${structureDark};
  border-radius: 10px;
  width: 100%;
  border: 2px solid ${structureDark};
  color: #666360;

  ${(props) =>
    props.hasError &&
    css`
      border-color: ${errorColor};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${secondaryColor};
      border-color: ${secondaryColor};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${secondaryColor};
    `}

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

  > svg {
    margin-left: 16px;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  padding: 0 16px;

  > span {
    background: ${errorColor};
    color: #fff;

    &::before {
      border-top-color: ${errorColor};
    }
  }
`
