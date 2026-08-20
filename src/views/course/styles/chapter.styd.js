import styled from 'styled-components'
import {
  color,
  font,
  radius,
  shadow,
  space,
  text,
  transition,
  media
} from '../../../styles/theme'

export const ChapterContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 292px minmax(0, 1fr);
  gap: ${space.xl};
  align-items: start;

  ${media.lg} {
    grid-template-columns: 250px minmax(0, 1fr);
  }

  ${media.md} {
    grid-template-columns: 1fr;
  }
`

export const LeftPanel = styled.aside`
  position: sticky;
  top: 88px;
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: ${space.lg};
  max-height: calc(100vh - 120px);

  ${media.md} {
    position: static;
    max-height: none;
  }
`

export const VersionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  margin: 0 -4px;
  padding: 0 4px;
`

export const VersionItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${space.md};
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: ${radius.sm};
  border: 1px solid ${props => props.$active ? color.brand : color.line};
  background: ${props => props.$active ? color.brandTint : color.surface};
  cursor: pointer;
  font-family: inherit;
  transition: all ${transition.fast};

  &:hover {
    border-color: ${props => props.$active ? color.brand : color.lineStrong};
    background: ${props => props.$active ? color.brandTint : color.surfaceAlt};
  }

  &:focus {
    outline: none;
  }
`

export const VersionInfo = styled.span`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const VersionNumber = styled.span`
  font-size: ${text.small};
  font-weight: 600;
  color: ${props => props.$active ? color.brand : color.inkStrong};
`

export const VersionDate = styled.span`
  font-size: ${text.micro};
  color: ${color.inkFaint};
`

export const FavoriteIcon = styled.span`
  display: flex;
  align-items: center;
  flex: none;
  font-size: 15px;
  color: ${props => props.$favorite ? color.star : color.lineStrong};
  transition: color ${transition.fast};

  &:hover {
    color: ${props => props.$favorite ? color.warning : color.inkFaint};
  }
`

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space.lg};
  min-width: 0;
`

export const ReaderCard = styled.article`
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.xs};
  padding: 40px 44px;

  ${media.sm} {
    padding: 24px 20px;
  }
`

export const ComposerCard = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: ${space.md};
`

export const ComposerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.sm};
  font-size: ${text.small};
  font-weight: 600;
  color: ${color.inkStrong};
`

export const PromptInput = styled.textarea`
  width: 100%;
  min-height: 84px;
  padding: 12px 14px;
  border: 1px solid ${color.line};
  border-radius: ${radius.sm};
  background: ${color.surfaceAlt};
  font-family: inherit;
  font-size: ${text.small};
  color: ${color.ink};
  line-height: 1.6;
  resize: vertical;
  transition: all ${transition.fast};

  &::placeholder {
    color: ${color.inkFaint};
  }

  &:focus {
    outline: none;
    background: ${color.surface};
    border-color: ${color.brand};
    box-shadow: 0 0 0 3px ${color.brandTint};
  }
`

export const ComposerActions = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space.sm};
`

export const HistoryItem = styled.div`
  padding: 12px 14px;
  border-radius: ${radius.sm};
  background: ${color.surfaceAlt};
  border: 1px solid ${color.line};
`

export const HistoryDate = styled.div`
  font-size: ${text.micro};
  color: ${color.inkFaint};
  margin-bottom: 4px;
`

export const HistoryText = styled.div`
  font-size: ${text.small};
  color: ${color.inkBody};
`

/* Tipografía del contenido generado: pensada para lectura larga */
export const ContentText = styled.div`
  max-width: 74ch;
  font-size: 15.5px;
  line-height: 1.8;
  color: ${color.inkBody};

  p {
    margin: 0 0 18px;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${color.ink};
    letter-spacing: -0.01em;
  }

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid ${color.line};
    line-height: 1.3;
  }

  h2 {
    font-size: 21px;
    font-weight: 600;
    margin: 34px 0 14px;
    line-height: 1.35;
  }

  h3 {
    font-size: 17px;
    font-weight: 600;
    margin: 26px 0 10px;
  }

  h4, h5, h6 {
    font-size: 15px;
    font-weight: 600;
    margin: 22px 0 8px;
  }

  ul, ol {
    margin: 0 0 18px;
    padding-left: 22px;
  }

  li {
    margin-bottom: 8px;
  }

  li > ul,
  li > ol {
    margin: 8px 0;
  }

  strong {
    font-weight: 600;
    color: ${color.ink};
  }

  code {
    background: ${color.surfaceSunken};
    border: 1px solid ${color.line};
    padding: 1px 6px;
    border-radius: ${radius.sm};
    font-family: ${font.mono};
    font-size: 13px;
    color: ${color.brandDeep};
  }

  pre {
    background: ${color.surfaceSunken};
    border: 1px solid ${color.line};
    border-radius: ${radius.md};
    padding: 16px 18px;
    overflow-x: auto;
    margin: 0 0 18px;
  }

  pre code {
    background: transparent;
    border: none;
    padding: 0;
    color: ${color.inkStrong};
  }

  blockquote {
    margin: 0 0 18px;
    padding: 4px 0 4px 18px;
    border-left: 2px solid ${color.brand};
    color: ${color.inkMuted};
  }

  blockquote p:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${color.brand};
    text-decoration: none;
    border-bottom: 1px solid ${color.brandTintStrong};
  }

  a:hover {
    border-bottom-color: ${color.brand};
  }

  hr {
    border: none;
    border-top: 1px solid ${color.line};
    margin: 32px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 18px;
    font-size: ${text.small};
  }

  th {
    background: ${color.surfaceAlt};
    color: ${color.inkStrong};
    font-weight: 600;
    text-align: left;
    padding: 10px 12px;
    border: 1px solid ${color.line};
  }

  td {
    padding: 10px 12px;
    border: 1px solid ${color.line};
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${radius.md};
    margin: 18px 0;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`

/* ---------------------------------------------------------------- */
/* Lectura vs. Markdown                                              */
/* ---------------------------------------------------------------- */

export const ReaderToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${space.md};
  flex-wrap: wrap;
  margin: 0 0 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${color.line};
`

export const ViewToggle = styled.div`
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  background: ${color.surfaceSunken};
  border-radius: ${radius.sm};
`

export const ViewToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  font-family: inherit;
  font-size: ${text.small};
  font-weight: 600;
  cursor: pointer;
  transition: all ${transition.fast};
  background: ${props => props.$active ? color.surface : 'transparent'};
  color: ${props => props.$active ? color.brand : color.inkMuted};
  box-shadow: ${props => props.$active ? shadow.xs : 'none'};

  &:hover {
    color: ${props => props.$active ? color.brand : color.inkStrong};
  }

  &:focus {
    outline: none;
  }
`

export const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.sm};
`

/* El Markdown crudo: se muestra tal cual está guardado, listo para copiar */
export const MarkdownSource = styled.pre`
  margin: 0;
  padding: 20px 22px;
  max-height: 70vh;
  overflow: auto;
  background: ${color.surfaceAlt};
  border: 1px solid ${color.line};
  border-radius: ${radius.md};
  font-family: ${font.mono};
  font-size: 13px;
  line-height: 1.7;
  color: ${color.inkBody};
  white-space: pre-wrap;
  word-break: break-word;
  user-select: text;
  tab-size: 2;

  ${media.sm} {
    padding: 16px;
    font-size: 12px;
  }
`
