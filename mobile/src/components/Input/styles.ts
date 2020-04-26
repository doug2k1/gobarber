import styled, { css } from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'
import { structureDark, errorColor, secondaryColor } from '../../styles/vars'

interface ContainerProps {
  isFocused: boolean
  hasError: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${structureDark};
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${structureDark};

  ${(props) =>
    props.hasError &&
    css`
      border-color: ${errorColor};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${secondaryColor};
    `}
`

export const StyledTextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  align-self: stretch;
`

interface StyledIconProps {
  isFilled: boolean
  isFocused: boolean
}

export const StyledIcon = styled(Icon)<StyledIconProps>`
  color: #666360;
  margin-right: 16px;

  ${(props) =>
    props.isFilled &&
    css`
      color: ${secondaryColor};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${secondaryColor};
    `}
`
