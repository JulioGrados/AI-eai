import { Layout } from 'antd'
import styled from 'styled-components'
import { color, font, layout, radius, space, text, transition, media } from '../../styles/theme'

const { Content, Footer, Sider } = Layout

export const BaseLayout = styled(Layout)`
  min-height: 100vh;
  background: ${color.bg};
`

export const BaseSider = styled(Sider)`
  background: ${color.surface};
  border-right: 1px solid ${color.line};
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  overflow: auto;
  z-index: 20;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    padding: 18px 14px 14px;
  }
`

export const SiderBrand = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
  height: 44px;
  padding: 0 ${props => props.$collapsed ? '0' : '8px'};
  margin-bottom: 26px;
  cursor: pointer;
`

export const SiderSectionLabel = styled.div`
  font-size: ${text.micro};
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${color.inkFaint};
  padding: 0 12px;
  margin-bottom: 8px;
  opacity: ${props => props.$collapsed ? 0 : 1};
  height: ${props => props.$collapsed ? '0' : 'auto'};
  overflow: hidden;
  transition: opacity ${transition.fast};
`

export const SiderNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${space.md};
  height: 42px;
  padding: 0 12px;
  border-radius: ${radius.sm};
  font-size: ${text.body};
  font-weight: ${props => props.$active ? 600 : 500};
  color: ${props => props.$active ? color.brand : color.inkBody};
  background: ${props => props.$active ? color.brandTint : 'transparent'};
  white-space: nowrap;
  overflow: hidden;
  transition: background ${transition.fast}, color ${transition.fast};

  i {
    font-size: 16px;
    flex: none;
    color: ${props => props.$active ? color.brand : color.inkMuted};
    transition: color ${transition.fast};
  }

  span {
    opacity: ${props => props.$collapsed ? 0 : 1};
    transition: opacity ${transition.fast};
  }

  &:hover {
    color: ${color.brand};
    background: ${color.brandTint};

    i {
      color: ${color.brand};
    }
  }
`

export const SiderSpacer = styled.div`
  flex: 1;
`

export const SiderFooter = styled.div`
  border-top: 1px solid ${color.line};
  padding-top: 14px;
  font-size: ${text.micro};
  color: ${color.inkFaint};
  text-align: ${props => props.$collapsed ? 'center' : 'left'};
  padding-left: ${props => props.$collapsed ? '0' : '12px'};
  line-height: 1.5;
`

export const BaseShell = styled(Layout)`
  background: ${color.bg};
  margin-left: ${props => props.$collapsed ? layout.siderCollapsed : layout.siderWidth}px;
  transition: margin-left ${transition.base};
  min-height: 100vh;

  ${media.md} {
    margin-left: ${layout.siderCollapsed}px;
  }
`

export const BaseBody = styled(Content)`
  width: 100%;
  max-width: ${layout.maxContent};
  margin: 0 auto;
  padding: 32px 40px 8px;

  ${media.md} {
    padding: 24px 20px 8px;
  }
`

export const BaseFooter = styled(Footer)`
  background: transparent;
  text-align: center;
  color: ${color.inkFaint};
  font-family: ${font.family};
  font-size: ${text.tiny};
  padding: 24px;
`
