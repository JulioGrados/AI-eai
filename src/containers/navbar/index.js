import { Header } from 'components-path'
import { useReduxState } from '../../hooks/redux'

export const NavBar = ({ section, title, collapsed, onToggle }) => {
  const authState = useReduxState('auth')
  return (
    <Header
      user={authState.user}
      section={section}
      title={title}
      collapsed={collapsed}
      onToggle={onToggle}
    />
  )
}
