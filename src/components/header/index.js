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

  return (
    <Navbar>
      <Container>
        <NavbarContainer>
          <NavbarUser>
            <UserAvatar>{initials}</UserAvatar>
            <UserName>{fullName}</UserName>
          </NavbarUser>
        </NavbarContainer>
      </Container>
    </Navbar>
  )
}
