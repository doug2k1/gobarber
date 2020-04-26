import React from 'react'
import { Text } from 'react-native'
import { useAuth } from '../../hooks/auth'
import Button from '../../components/Button'

const Dashboard: React.FC = () => {
  const { signout } = useAuth()

  return (
    <>
      <Text style={{ paddingTop: 100 }}>Dashboard</Text>
      <Button onPress={() => signout()}>Signout</Button>
    </>
  )
}

export default Dashboard
