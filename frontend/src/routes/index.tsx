import React from 'react'
import { Switch } from 'react-router-dom'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import Route from './Route'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Signin} toDashboard />
    <Route path="/signup" component={Signup} toDashboard />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
)

export default Routes
