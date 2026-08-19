/**
 * Design tokens de EAI.
 * Toda la UI toma sus colores, espaciados y sombras de aquí:
 * si algo se ve distinto en dos pantallas, es que no está usando estos tokens.
 *
 * La paleta es la de la marca (el degradado del logo EAI):
 * azul #003cff -> #00d0e7, con #0080ff como color de acción.
 */

export const color = {
  // Marca
  brand: '#0080ff',
  brandDeep: '#003cff',
  brandSoft: '#00d0e7',
  brandHover: '#2b96ff',
  brandActive: '#006ad6',
  brandTint: '#eaf4ff',
  brandTintStrong: '#d6e9ff',

  // Neutros (ligeramente azulados para acompañar al fondo #f4f7fd)
  ink: '#0e1b2e',
  inkStrong: '#1d2b42',
  inkBody: '#3d4a61',
  inkMuted: '#6b7a90',
  inkFaint: '#95a1b5',

  line: '#e5eaf3',
  lineStrong: '#d3dbe9',

  surface: '#ffffff',
  surfaceAlt: '#f8fafd',
  surfaceSunken: '#f1f5fb',
  bg: '#f4f7fd',

  // Semánticos (los mismos que ya usaba la app)
  success: '#52c41a',
  successTint: '#f6ffed',
  successLine: '#b7eb8f',
  danger: '#ff4d4f',
  dangerTint: '#fff1f0',
  warning: '#faad14',
  star: '#fadb14',

  white: '#ffffff'
}

export const gradient = {
  brand: `linear-gradient(135deg, ${color.brandDeep} 0%, ${color.brandSoft} 100%)`,
  brandSoft: `linear-gradient(135deg, ${color.brand} 0%, ${color.brandSoft} 100%)`
}

export const radius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  pill: '999px'
}

export const shadow = {
  none: 'none',
  xs: '0 1px 2px rgba(14, 27, 46, 0.04)',
  sm: '0 2px 6px rgba(14, 27, 46, 0.05)',
  md: '0 6px 20px rgba(14, 27, 46, 0.07)',
  lg: '0 16px 40px rgba(14, 27, 46, 0.10)',
  brand: '0 6px 18px rgba(0, 128, 255, 0.22)'
}

export const space = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px'
}

export const font = {
  family: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'SFMono-Regular', 'JetBrains Mono', Menlo, Consolas, monospace"
}

export const text = {
  display: '26px',
  title: '20px',
  subtitle: '16px',
  body: '14px',
  small: '13px',
  tiny: '12px',
  micro: '11px'
}

export const layout = {
  siderWidth: 248,
  siderCollapsed: 76,
  headerHeight: 64,
  maxContent: '1240px'
}

export const transition = {
  fast: '0.15s ease',
  base: '0.22s cubic-bezier(0.2, 0, 0, 1)'
}

export const media = {
  sm: '@media (max-width: 640px)',
  md: '@media (max-width: 900px)',
  lg: '@media (max-width: 1200px)'
}

export const theme = {
  color,
  gradient,
  radius,
  shadow,
  space,
  font,
  text,
  layout,
  transition,
  media
}

export default theme
