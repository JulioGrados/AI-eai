import { Dropdown, Menu, Icon } from 'antd'
import Router from 'next/router'
import { session } from 'utils'

import {
  Navbar,
  Container,
  ToggleButton,
  PageTitle,
  Crumb,
  CrumbSep,
  Spacer,
  NavbarContainer,
  NavbarUser,
  UserAvatar,
  UserMeta,
  UserName,
  UserRole,
  Caret
} from './style'

export const Header = ({ user, section, title, collapsed, onToggle }) => {
  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : ''
  const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : ''
  const role = user && user.roles && user.roles.length ? user.roles[0] : 'Usuario'

  const logout = () => {
    // La sesión vive en cookies (jwt / user); limpiarlas es lo que
    // realmente cierra la sesión
    session.removeCookie('jwt')
    session.removeCookie('user')
    Router.push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item key='logout' onClick={logout}>
        <Icon type='logout' />
        <span style={{ marginLeft: 8 }}>Cerrar sesión</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Navbar>
      <Container>
        {onToggle && (
          <ToggleButton onClick={onToggle} aria-label='Mostrar u ocultar el menú'>
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </ToggleButton>
        )}
        <PageTitle>
          {title ? (
            <>
              <Crumb>{section}</Crumb>
              <CrumbSep>/</CrumbSep>
              {title}
            </>
          ) : section}
        </PageTitle>
        <Spacer />
        {user && (
          <NavbarContainer>
            <Dropdown overlay={menu} trigger={['hover', 'click']} placement='bottomRight'>
              <NavbarUser>
                <UserAvatar>{initials}</UserAvatar>
                <UserMeta>
                  <UserName>{fullName}</UserName>
                  <UserRole>{role}</UserRole>
                </UserMeta>
                <Caret>
                  <Icon type='down' />
                </Caret>
              </NavbarUser>
            </Dropdown>
          </NavbarContainer>
        )}
      </Container>
    </Navbar>
  )
}
