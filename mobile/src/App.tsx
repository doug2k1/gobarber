import React from 'react'
import { View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { bgColor } from './styles/vars'
import AuthRoutes from './routes'
import AppProvider from './hooks'

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={bgColor} />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: bgColor }}>
          <AuthRoutes />
        </View>
      </AppProvider>
    </NavigationContainer>
  )
}

export default App
