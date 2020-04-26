import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { bgColor, secondaryColor } from '../../styles/vars'

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: ${secondaryColor};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`

export const ButtonText = styled.Text`
  color: ${bgColor};
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
`
