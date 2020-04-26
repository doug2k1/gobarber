import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
  const { signout } = useAuth()

  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/" onClick={() => signout()}>
        Signout
      </Link>
    </>
  )
}

export default Dashboard
