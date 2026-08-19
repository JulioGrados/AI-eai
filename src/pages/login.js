import Head from 'next/head'
import { useEffect } from 'react'
import { session } from 'utils'

import { Login } from '../views/auth/containers/login'

const LoginPage = () => {
  // Al llegar al login la sesión previa se descarta
  useEffect(() => {
    session.removeCookie('jwt')
    session.removeCookie('user')
  }, [])

  return (
    <>
      <Head>
        <title>Ingresar - Cursos IA</title>
      </Head>
      <Login />
    </>
  )
}

export default LoginPage
