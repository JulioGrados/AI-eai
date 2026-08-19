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

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space.xl};
`

export const Hero = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: ${radius.xl};
  background: ${gradient.brand};
  color: ${color.white};
  padding: 38px 40px;
  display: flex;
  align-items: center;
  gap: ${space.xxl};

  /* Halo suave para que el degradado no se vea plano */
  &::after {
    content: '';
    position: absolute;
    right: -80px;
    top: -120px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
  }

  ${media.md} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${space.xl};
    padding: 28px 24px;
  }
`

export const HeroBody = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
`

export const HeroTitle = styled.h2`
  font-size: 25px;
  font-weight: 700;
  color: ${color.white};
  margin: 0 0 8px;
  letter-spacing: -0.02em;
  line-height: 1.3;
`

export const HeroText = styled.p`
  margin: 0;
  font-size: ${text.body};
  color: rgba(255, 255, 255, 0.85);
  max-width: 560px;
`

export const HeroActions = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: ${space.md};
  flex: none;
`

export const HeroButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${space.sm};
  height: 44px;
  padding: 0 22px;
  border-radius: ${radius.sm};
  border: none;
  background: ${color.white};
  color: ${color.brandDeep};
  font-family: inherit;
  font-size: ${text.body};
  font-weight: 600;
  cursor: pointer;
  transition: transform ${transition.fast}, box-shadow ${transition.fast};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  }

  &:focus {
    outline: none;
  }
`

export const RecentList = styled.div`
  display: flex;
  flex-direction: column;
`

export const RecentItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.md};
  padding: 14px 12px;
  border-radius: ${radius.sm};
  cursor: pointer;
  transition: background ${transition.fast};

  & + & {
    border-top: 1px solid ${color.line};
  }

  &:hover {
    background: ${color.surfaceAlt};
  }
`

export const RecentIcon = styled.span`
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: ${radius.md};
  background: ${color.brandTint};
  color: ${color.brand};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RecentBody = styled.div`
  flex: 1;
  min-width: 0;
`

export const RecentName = styled.div`
  font-size: ${text.body};
  font-weight: 600;
  color: ${color.ink};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const RecentSubject = styled.div`
  font-size: ${text.tiny};
  color: ${color.inkFaint};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
