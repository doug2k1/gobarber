import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { bgColor } from '../styles/vars'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'

const Auth = createStackNavigator()

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: bgColor },
    }}
  >
    <Auth.Screen name="Signin" component={Signin} />
    <Auth.Screen name="Signup" component={Signup} />
  </Auth.Navigator>
)

export default AuthRoutes
