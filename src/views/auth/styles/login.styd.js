import styled from 'styled-components'
import {
  color,
  gradient,
  radius,
  shadow,
  space,
  text,
  media
} from '../../../styles/theme'

export const LoginScreen = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  background: ${color.bg};

  ${media.md} {
    grid-template-columns: 1fr;
  }
`

/* Panel de marca: solo aparece en pantallas grandes */
export const LoginBrandPanel = styled.section`
  position: relative;
  overflow: hidden;
  background: ${gradient.brand};
  color: ${color.white};
  padding: 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::after {
    content: '';
    position: absolute;
    left: -140px;
    bottom: -180px;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }

  ${media.md} {
    display: none;
  }
`

export const BrandTop = styled.div`
  position: relative;
  z-index: 1;
`

export const BrandBody = styled.div`
  position: relative;
  z-index: 1;
  max-width: 420px;
`

export const BrandTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${color.white};
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin: 0 0 14px;
`

export const BrandText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
`

export const BrandFooter = styled.div`
  position: relative;
  z-index: 1;
  font-size: ${text.tiny};
  color: rgba(255, 255, 255, 0.66);
`

export const LoginPanel = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
`

export const LoginCard = styled.div`
  width: 100%;
  max-width: 380px;
`

export const LoginMobileLogo = styled.div`
  display: none;
  justify-content: center;
  margin-bottom: ${space.xl};

  ${media.md} {
    display: flex;
  }
`

export const LoginTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${color.ink};
  margin: 0 0 6px;
  letter-spacing: -0.02em;
`

export const LoginSubtitle = styled.p`
  margin: 0 0 ${space.xl};
  font-size: ${text.small};
  color: ${color.inkMuted};
`

export const LoginFormCard = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.sm};
  padding: 28px;
`

export const LoginFooter = styled.p`
  margin: ${space.xl} 0 0;
  text-align: center;
  font-size: ${text.micro};
  color: ${color.inkFaint};
`
