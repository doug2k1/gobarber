import React from 'react'
import { RouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

interface Props extends RouteProps {
  isPrivate?: boolean
  toDashboard?: boolean
}

const Route: React.FC<Props> = ({
  isPrivate = false,
  toDashboard = false,
  ...rest
}) => {
  const { user } = useAuth()

  if (isPrivate && !user) return <Redirect to="/" />
  if (toDashboard && user) return <Redirect to="/dashboard" />

  return <ReactDOMRoute {...rest} />
}

export default Route
