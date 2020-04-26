import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'
import { structureDark } from '../../styles/vars'

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${structureDark};
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`

export const StyledTextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  align-self: stretch;
`

export const StyledIcon = styled(Icon)`
  margin-right: 16px;
`
