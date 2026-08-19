import styled from 'styled-components'
import { color, gradient, layout, radius, space, text, transition, media } from '../../styles/theme'

export const Navbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 15;
  height: ${layout.headerHeight}px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid ${color.line};
`

export const Container = styled.div`
  height: 100%;
  max-width: ${layout.maxContent};
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  gap: ${space.lg};

  ${media.md} {
    padding: 0 20px;
  }
`

export const ToggleButton = styled.button`
  width: 34px;
  height: 34px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: ${radius.sm};
  color: ${color.inkMuted};
  font-size: 16px;
  cursor: pointer;
  transition: all ${transition.fast};

  &:hover {
    background: ${color.surfaceSunken};
    color: ${color.brand};
  }

  &:focus {
    outline: none;
  }
`

export const PageTitle = styled.h1`
  font-size: ${text.subtitle};
  font-weight: 600;
  color: ${color.ink};
  margin: 0;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Crumb = styled.span`
  color: ${color.inkFaint};
  font-weight: 500;
`

export const CrumbSep = styled.span`
  color: ${color.lineStrong};
  margin: 0 8px;
`

export const Spacer = styled.div`
  flex: 1;
`

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.sm};
`

export const NavbarUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px 10px 5px 5px;
  border-radius: ${radius.pill};
  border: 1px solid transparent;
  transition: all ${transition.fast};

  &:hover {
    background: ${color.surfaceSunken};
    border-color: ${color.line};
  }
`

export const UserAvatar = styled.div`
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: 50%;
  background: ${gradient.brand};
  color: ${color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${text.tiny};
  letter-spacing: 0.02em;
`

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.25;

  ${media.sm} {
    display: none;
  }
`

export const UserName = styled.span`
  font-size: ${text.small};
  color: ${color.inkStrong};
  font-weight: 600;
`

export const UserRole = styled.span`
  font-size: ${text.micro};
  color: ${color.inkFaint};
`

export const Caret = styled.span`
  color: ${color.inkFaint};
  font-size: 11px;
  margin-left: 2px;

  ${media.sm} {
    display: none;
  }
`
