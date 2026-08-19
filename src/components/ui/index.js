import styled, { keyframes, css } from 'styled-components'
import { Icon } from 'antd'
import {
  color,
  gradient,
  radius,
  shadow,
  space,
  text,
  transition,
  media
} from '../../styles/theme'

/**
 * Piezas de UI compartidas.
 * Cada pantalla se arma con estas piezas, así el mismo elemento
 * (una tarjeta, un botón, un vacío) se ve igual en toda la aplicación.
 */

/* ---------------------------------------------------------------- */
/* Superficies                                                       */
/* ---------------------------------------------------------------- */

export const Panel = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.xs};
  padding: ${props => props.$flush ? '0' : '28px'};

  ${media.sm} {
    padding: ${props => props.$flush ? '0' : '20px'};
    border-radius: ${radius.md};
  }
`

export const PanelSection = styled.section`
  & + & {
    margin-top: 28px;
    padding-top: 28px;
    border-top: 1px solid ${color.line};
  }
`

export const SectionTitle = styled.h3`
  font-size: ${text.small};
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${color.inkFaint};
  margin: 0 0 ${space.lg};
`

export const Divider = styled.div`
  height: 1px;
  background: ${color.line};
  margin: ${props => props.$space || '24px'} 0;
`

/* ---------------------------------------------------------------- */
/* Encabezado de página                                              */
/* ---------------------------------------------------------------- */

const HeadWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${space.lg};
  margin-bottom: ${props => props.$tight ? '20px' : '28px'};

  ${media.sm} {
    flex-wrap: wrap;
  }
`

const HeadTexts = styled.div`
  flex: 1;
  min-width: 0;
`

const HeadTitle = styled.h2`
  font-size: ${text.display};
  font-weight: 600;
  color: ${color.ink};
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.25;

  ${media.sm} {
    font-size: 21px;
  }
`

const HeadSubtitle = styled.p`
  margin: 6px 0 0;
  font-size: ${text.small};
  color: ${color.inkMuted};
`

const HeadActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.md};
  flex: none;
`

export const BackButton = styled.button`
  width: 38px;
  height: 38px;
  flex: none;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${color.line};
  background: ${color.surface};
  border-radius: ${radius.sm};
  color: ${color.inkMuted};
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

export const PageHead = ({ title, subtitle, actions, onBack, tight, children }) => (
  <HeadWrap $tight={tight}>
    {onBack && (
      <BackButton onClick={onBack} aria-label='Volver'>
        <Icon type='arrow-left' />
      </BackButton>
    )}
    <HeadTexts>
      {children || <HeadTitle>{title}</HeadTitle>}
      {subtitle && <HeadSubtitle>{subtitle}</HeadSubtitle>}
    </HeadTexts>
    {actions && <HeadActions>{actions}</HeadActions>}
  </HeadWrap>
)

/* Título editable en línea (capítulos y evaluaciones) */
export const InlineTitleInput = styled.input`
  width: 100%;
  font-family: inherit;
  font-size: ${text.display};
  font-weight: 600;
  color: ${color.ink};
  letter-spacing: -0.02em;
  border: 1px solid transparent;
  background: transparent;
  border-radius: ${radius.sm};
  padding: 4px 8px;
  margin-left: -8px;
  transition: all ${transition.fast};

  &:hover {
    background: ${color.surfaceSunken};
  }

  &:focus {
    outline: none;
    background: ${color.white};
    border-color: ${color.brand};
    box-shadow: 0 0 0 3px ${color.brandTint};
  }
`

/* ---------------------------------------------------------------- */
/* Botones                                                           */
/* ---------------------------------------------------------------- */

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${space.sm};
  height: ${props => props.$size === 'lg' ? '44px' : '38px'};
  padding: 0 ${props => props.$size === 'lg' ? '24px' : '16px'};
  border-radius: ${radius.sm};
  font-family: inherit;
  font-size: ${text.body};
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all ${transition.fast};

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const PrimaryButton = styled.button`
  ${buttonBase};
  border: 1px solid ${color.brand};
  background: ${color.brand};
  color: ${color.white};
  box-shadow: ${shadow.brand};

  &:hover:not(:disabled) {
    background: ${color.brandHover};
    border-color: ${color.brandHover};
  }

  &:active:not(:disabled) {
    background: ${color.brandActive};
    border-color: ${color.brandActive};
  }

  &:disabled {
    background: ${color.lineStrong};
    border-color: ${color.lineStrong};
    box-shadow: none;
  }
`

export const GhostButton = styled.button`
  ${buttonBase};
  border: 1px solid ${color.line};
  background: ${color.surface};
  color: ${color.inkStrong};

  &:hover:not(:disabled) {
    border-color: ${color.brand};
    color: ${color.brand};
    background: ${color.brandTint};
  }
`

export const IconButton = styled.button`
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: ${radius.sm};
  color: ${color.inkFaint};
  font-size: 15px;
  cursor: pointer;
  transition: all ${transition.fast};

  &:hover {
    background: ${props => props.$danger ? color.dangerTint : color.brandTint};
    color: ${props => props.$danger ? color.danger : color.brand};
  }

  &:focus {
    outline: none;
  }
`

/* ---------------------------------------------------------------- */
/* Indicadores                                                       */
/* ---------------------------------------------------------------- */

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  padding: 0 10px;
  border-radius: ${radius.pill};
  background: ${props => props.$tone === 'brand' ? color.brandTint : color.surfaceSunken};
  color: ${props => props.$tone === 'brand' ? color.brand : color.inkMuted};
  font-size: ${text.micro};
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
`

export const Counter = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border-radius: ${radius.sm};
  background: ${color.brandTint};
  color: ${color.brand};
  font-size: ${text.tiny};
  font-weight: 600;
  flex: none;
`

export const OrderBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex: none;
  border-radius: ${radius.sm};
  background: ${gradient.brand};
  color: ${color.white};
  font-size: ${text.tiny};
  font-weight: 600;
`

export const MetaText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${text.tiny};
  color: ${color.inkFaint};
  white-space: nowrap;
`

/* ---------------------------------------------------------------- */
/* Estado vacío                                                      */
/* ---------------------------------------------------------------- */

const EmptyWrap = styled.div`
  text-align: center;
  padding: 64px 24px;
`

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto ${space.lg};
  border-radius: ${radius.lg};
  background: ${color.brandTint};
  color: ${color.brand};
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const EmptyTitle = styled.div`
  font-size: ${text.subtitle};
  font-weight: 600;
  color: ${color.ink};
  margin-bottom: 6px;
`

const EmptyText = styled.div`
  font-size: ${text.small};
  color: ${color.inkMuted};
  max-width: 380px;
  margin: 0 auto;
`

const EmptyAction = styled.div`
  margin-top: ${space.xl};
  display: flex;
  justify-content: center;
`

export const EmptyState = ({ icon = 'inbox', title, text: description, action }) => (
  <EmptyWrap>
    <EmptyIcon>
      <Icon type={icon} />
    </EmptyIcon>
    <EmptyTitle>{title}</EmptyTitle>
    {description && <EmptyText>{description}</EmptyText>}
    {action && <EmptyAction>{action}</EmptyAction>}
  </EmptyWrap>
)

/* ---------------------------------------------------------------- */
/* Carga                                                             */
/* ---------------------------------------------------------------- */

const shimmer = keyframes`
  0% { background-position: -420px 0; }
  100% { background-position: 420px 0; }
`

export const SkeletonBlock = styled.div`
  height: ${props => props.$height || '14px'};
  width: ${props => props.$width || '100%'};
  border-radius: ${props => props.$radius || radius.sm};
  background: linear-gradient(
    90deg,
    ${color.surfaceSunken} 25%,
    ${color.line} 37%,
    ${color.surfaceSunken} 63%
  );
  background-size: 840px 100%;
  animation: ${shimmer} 1.3s ease-in-out infinite;
`

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${space.md};
  padding: 56px 24px;
  color: ${color.inkMuted};
  font-size: ${text.small};
`

export const LoadingState = ({ text: label = 'Cargando...' }) => (
  <LoadingWrap>
    <Icon type='loading' style={{ fontSize: 24, color: color.brand }} />
    <span>{label}</span>
  </LoadingWrap>
)

/* ---------------------------------------------------------------- */
/* Métricas                                                          */
/* ---------------------------------------------------------------- */

const StatWrap = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  padding: 20px 22px;
  display: flex;
  align-items: center;
  gap: ${space.lg};
  transition: all ${transition.base};

  &:hover {
    border-color: ${color.brandTintStrong};
    box-shadow: ${shadow.sm};
  }
`

const StatIcon = styled.div`
  width: 42px;
  height: 42px;
  flex: none;
  border-radius: ${radius.md};
  background: ${color.brandTint};
  color: ${color.brand};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StatBody = styled.div`
  min-width: 0;
`

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${color.ink};
  line-height: 1.1;
  letter-spacing: -0.02em;
`

const StatLabel = styled.div`
  font-size: ${text.tiny};
  color: ${color.inkMuted};
  margin-top: 4px;
`

export const Stat = ({ icon, value, label }) => (
  <StatWrap>
    <StatIcon>
      <Icon type={icon} />
    </StatIcon>
    <StatBody>
      <StatValue>{value}</StatValue>
      <StatLabel>{label}</StatLabel>
    </StatBody>
  </StatWrap>
)

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: ${space.lg};
`
