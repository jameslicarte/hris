import React from 'react'
import LoginForm from './components/LoginForm'

export type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const Login = () => {
  return <LoginForm />
}

export default Login
