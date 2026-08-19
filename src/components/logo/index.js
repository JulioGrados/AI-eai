import styled from 'styled-components'
import { color, font, transition } from '../../styles/theme'

/**
 * Logotipo EAI.
 *
 * Se dibuja como SVG inline (no como <img>) por tres motivos:
 *  - nunca se deforma: el isotipo conserva su proporción 1:1 a cualquier tamaño
 *  - se ve nítido en retina y en tamaños pequeños, donde el trazado del
 *    lettering original del .svg se volvía ilegible
 *  - el lettering se compone con tipografía real, así que hereda el color
 *    (blanco sobre fondos oscuros, tinta sobre fondos claros)
 *
 * Geometría e identidad tomadas de /static/img/eai_color.svg:
 * círculo + cuadrado que se tocan en la diagonal, degradado #003cff -> #00d0e7.
 */

const Wrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => Math.round(props.$size * 0.42)}px;
  user-select: none;
  line-height: 1;
`

const Marks = styled.span`
  display: inline-flex;
  flex: none;
  transition: transform ${transition.base};
`

const Words = styled.span`
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: hidden;
  white-space: nowrap;
`

const Wordmark = styled.span`
  font-family: ${font.family};
  font-weight: 700;
  font-size: ${props => Math.round(props.$size * 0.82)}px;
  letter-spacing: ${props => (props.$size * 0.02).toFixed(2)}px;
  color: ${props => props.$tone === 'light' ? color.white : color.ink};
  line-height: 1;
`

const Tagline = styled.span`
  font-family: ${font.family};
  font-weight: 500;
  font-size: ${props => Math.max(9, Math.round(props.$size * 0.3))}px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.$tone === 'light' ? 'rgba(255, 255, 255, 0.66)' : color.inkFaint};
  line-height: 1.2;
`

export const LogoMark = ({ size = 32, id = 'eai' }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 22.17 22.17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    role='img'
    aria-label='EAI'
  >
    <defs>
      <linearGradient
        id={`${id}-circle`}
        gradientUnits='userSpaceOnUse'
        x1='13.27'
        y1='2.42'
        x2='2.48'
        y2='13.21'
      >
        <stop offset='0' stopColor={color.brandDeep} />
        <stop offset='1' stopColor={color.brandSoft} />
      </linearGradient>
      <linearGradient
        id={`${id}-square`}
        gradientUnits='userSpaceOnUse'
        x1='22.42'
        y1='7.82'
        x2='7.88'
        y2='22.36'
      >
        <stop offset='0' stopColor={color.brandDeep} />
        <stop offset='1' stopColor={color.brandSoft} />
      </linearGradient>
    </defs>
    <circle cx='7.63' cy='7.63' r='7.63' fill={`url(#${id}-circle)`} />
    <rect x='7.63' y='7.63' width='14.54' height='14.54' fill={`url(#${id}-square)`} />
  </svg>
)

export const Logo = ({
  size = 32,
  variant = 'full',
  tone = 'dark',
  tagline = 'Escuela Americana de Innovación',
  id = 'eai'
}) => {
  return (
    <Wrap $size={size}>
      <Marks>
        <LogoMark size={size} id={id} />
      </Marks>
      {variant === 'full' && (
        <Words>
          <Wordmark $size={size} $tone={tone}>EAI</Wordmark>
          {tagline && <Tagline $size={size} $tone={tone}>{tagline}</Tagline>}
        </Words>
      )}
    </Wrap>
  )
}

export default Logo
