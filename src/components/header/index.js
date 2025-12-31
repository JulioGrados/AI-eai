import { Dropdown, Menu, Icon } from 'antd'
import Router from 'next/router'
import {
  Navbar,
  Container,
  NavbarContainer,
  NavbarUser,
  UserAvatar,
  UserName
} from './style'

export const Header = ({ user }) => {
  if (!user) return null

  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim()

  const logout = () => {
    localStorage.removeItem('token')
    Router.push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item key='logout' onClick={logout}>
        <Icon type='logout' />
        <span style={{ marginLeft: 8 }}>Cerrar Sesión</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Navbar>
      <Container>
        <NavbarContainer>
          <Dropdown overlay={menu} trigger={['hover', 'click']}>
            <NavbarUser style={{ cursor: 'pointer' }}>
              <UserAvatar>{initials}</UserAvatar>
              <UserName>{fullName}</UserName>
            </NavbarUser>
          </Dropdown>
        </NavbarContainer>
      </Container>
    </Navbar>
  )
}
