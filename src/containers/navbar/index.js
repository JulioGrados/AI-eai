import { Header } from 'components-path'
import { useReduxState } from '../../hooks/redux'

export const NavBar = () => {
  const authState = useReduxState('auth')
  return <Header user={authState.user} />
}
