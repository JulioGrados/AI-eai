import styled from 'styled-components'
import {
  color,
  radius,
  shadow,
  space,
  text,
  transition,
  media
} from '../../../styles/theme'

export const EvaluationContainer = styled.div`
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

export const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space.md};
`

export const QuestionCard = styled.article`
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.xs};
  padding: 22px 24px;

  ${media.sm} {
    padding: 18px;
  }
`

export const QuestionHeader = styled.header`
  display: flex;
  align-items: flex-start;
  gap: ${space.md};
  margin-bottom: ${space.lg};
`

export const QuestionText = styled.p`
  flex: 1;
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: ${color.ink};
  line-height: 1.55;
`

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 42px;

  ${media.sm} {
    padding-left: 0;
  }
`

export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.md};
  padding: 11px 14px;
  border-radius: ${radius.sm};
  background: ${props => props.$correct ? color.successTint : color.surfaceAlt};
  border: 1px solid ${props => props.$correct ? color.successLine : color.line};
`

export const OptionLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: none;
  border-radius: ${radius.sm};
  background: ${props => props.$correct ? color.success : color.surface};
  color: ${props => props.$correct ? color.white : color.inkMuted};
  border: 1px solid ${props => props.$correct ? color.success : color.lineStrong};
  font-size: ${text.micro};
  font-weight: 600;
`

export const OptionText = styled.span`
  flex: 1;
  font-size: ${text.small};
  color: ${color.inkBody};
`

export const CorrectBadge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: ${radius.pill};
  background: ${color.success};
  color: ${color.white};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  flex: none;
`

export const ContentText = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  padding: 24px;
  font-size: ${text.small};
  line-height: 1.8;
  color: ${color.inkBody};
  white-space: pre-wrap;
  word-wrap: break-word;
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
