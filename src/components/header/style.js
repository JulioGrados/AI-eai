import styled from 'styled-components'

export const Navbar = styled.div`
  background: #fff;
  padding: 0 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 64px;
`

export const NavbarUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  &:hover {
    background-color: #f5f5f5;
  }
`

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d4385b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
`

export const UserName = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`
