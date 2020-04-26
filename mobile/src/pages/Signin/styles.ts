import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Platform } from 'react-native'
import { textColor, structureDark, secondaryColor } from '../../styles/vars'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`

export const Title = styled.Text`
  color: ${textColor};
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`

export const ForgotPasswordText = styled.Text`
  color: ${textColor};
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 1px;
  border-color: ${structureDark};
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const CreateAccountText = styled.Text`
  color: ${secondaryColor};
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`
