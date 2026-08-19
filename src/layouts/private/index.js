import { useEffect } from 'react'
import Router from 'next/router'
import { session } from 'utils'

import { Loader } from '../../components'

import { PrivateMiddle } from './styles'

export const Private = Page => () => {
  const jwt = session.getCookie('jwt')
  const userSession = session.getCookie('user')
  const user = userSession ? JSON.parse(userSession) : null

  const isLogged =
    jwt && user && user.roles && user.roles.includes('Administrador')

  useEffect(() => {
    if (!isLogged) {
      Router.push('/login')
    }
  }, [])

  if (isLogged) {
    return <Page />
  }

  return (
    <PrivateMiddle>
      <Loader text='Verificando sesión...' />
    </PrivateMiddle>
  )
}
