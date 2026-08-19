import styled from 'styled-components'
import {
  color,
  gradient,
  radius,
  space,
  text,
  transition,
  media
} from '../../../styles/theme'

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols || 2}, minmax(0, 1fr));
  gap: 0 ${space.xl};

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`

export const ThemeCard = styled.div`
  border: 1px solid ${color.line};
  border-radius: ${radius.md};
  background: ${color.surfaceAlt};
  padding: 18px 18px 2px;
  transition: border-color ${transition.fast}, background ${transition.fast};

  & + & {
    margin-top: ${space.md};
  }

  &:hover {
    border-color: ${color.lineStrong};
    background: ${color.surface};
  }
`

export const ThemeCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.md};
  margin-bottom: ${space.md};
`

export const ThemeIndex = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex: none;
  border-radius: ${radius.sm};
  background: ${gradient.brand};
  color: ${color.white};
  font-size: ${text.micro};
  font-weight: 600;
`

export const ThemeLabel = styled.span`
  flex: 1;
  font-size: ${text.small};
  font-weight: 600;
  color: ${color.inkStrong};
`

export const ThemeBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 ${space.xl};

  ${media.md} {
    grid-template-columns: 1fr;
  }
`

export const AddThemeButton = styled.button`
  width: 100%;
  height: 44px;
  margin-top: ${space.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${space.sm};
  border: 1px dashed ${color.lineStrong};
  border-radius: ${radius.md};
  background: transparent;
  color: ${color.inkMuted};
  font-family: inherit;
  font-size: ${text.small};
  font-weight: 500;
  cursor: pointer;
  transition: all ${transition.fast};

  &:hover {
    border-color: ${color.brand};
    color: ${color.brand};
    background: ${color.brandTint};
  }

  &:focus {
    outline: none;
  }
`

export const FormFooter = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.lg};
  margin-top: ${space.xl};
  padding-top: ${space.xl};
  border-top: 1px solid ${color.line};
`

export const FooterHint = styled.span`
  font-size: ${text.tiny};
  color: ${color.inkFaint};
`

export const GeneratingPanel = styled.div`
  margin-top: ${space.xl};
  padding: 22px;
  border-radius: ${radius.md};
  background: ${color.brandTint};
  border: 1px solid ${color.brandTintStrong};
  display: flex;
  align-items: center;
  gap: ${space.lg};
`

export const GeneratingTitle = styled.div`
  font-size: ${text.body};
  font-weight: 600;
  color: ${color.ink};
  margin-bottom: 2px;
`

export const GeneratingText = styled.div`
  font-size: ${text.small};
  color: ${color.inkMuted};
`
