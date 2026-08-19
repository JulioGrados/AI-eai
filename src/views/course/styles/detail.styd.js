import styled from 'styled-components'
import {
  color,
  radius,
  shadow,
  space,
  text,
  transition
} from '../../../styles/theme'

export const CourseDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ModuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space.md};
`

export const ModuleCard = styled.div`
  background: ${color.surface};
  border: 1px solid ${props => props.$open ? color.brandTintStrong : color.line};
  border-radius: ${radius.md};
  overflow: hidden;
  transition: border-color ${transition.fast}, box-shadow ${transition.fast};

  &:hover {
    border-color: ${props => props.$open ? color.brandTintStrong : color.lineStrong};
  }
`

export const ModuleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.md};
  padding: 14px 16px;
  cursor: pointer;
  background: ${props => props.$open ? color.surfaceAlt : color.surface};
  border-bottom: 1px solid ${props => props.$open ? color.line : 'transparent'};
  transition: background ${transition.fast};

  &:hover {
    background: ${color.surfaceAlt};
  }
`

export const Chevron = styled.span`
  color: ${color.inkFaint};
  font-size: 11px;
  flex: none;
  display: flex;
  transition: transform ${transition.base};
  transform: rotate(${props => props.$open ? '90deg' : '0deg'});
`

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: none;
  color: ${color.inkFaint};
  cursor: grab;
  border-radius: ${radius.sm};
  touch-action: none;
  transition: all ${transition.fast};

  &:hover {
    background: ${color.surfaceSunken};
    color: ${color.inkMuted};
  }

  &:active {
    cursor: grabbing;
  }
`

export const ModuleName = styled.span`
  font-size: ${text.body};
  font-weight: 600;
  color: ${color.ink};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ModuleSpacer = styled.div`
  flex: 1;
`

export const ModuleActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  flex: none;
`

export const ModuleBody = styled.div`
  padding: 6px 16px 12px 58px;
`

export const ChapterList = styled.div`
  display: flex;
  flex-direction: column;
`

export const ChapterItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.md};
  padding: 11px 10px;
  border-radius: ${radius.sm};
  transition: background ${transition.fast};

  & + & {
    border-top: 1px solid ${color.line};
  }

  &:hover {
    background: ${color.surfaceAlt};
  }
`

export const ChapterDot = styled.span`
  width: 6px;
  height: 6px;
  flex: none;
  border-radius: 50%;
  background: ${props => props.$done ? color.brand : color.lineStrong};
`

export const ChapterTitle = styled.span`
  flex: 1;
  min-width: 0;
  font-size: ${text.small};
  color: ${color.inkBody};
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color ${transition.fast};

  &:hover {
    color: ${color.brand};
  }
`

export const ChapterWordCount = styled.span`
  font-size: ${text.tiny};
  color: ${color.inkFaint};
  white-space: nowrap;
  flex: none;
`

export const EvaluationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space.md};
`

export const EvaluationRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.md};
  padding: 16px;
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.md};
  cursor: pointer;
  transition: all ${transition.fast};

  &:hover {
    border-color: ${color.brandTintStrong};
    box-shadow: ${shadow.sm};
  }
`

export const EvaluationName = styled.span`
  font-size: ${text.body};
  font-weight: 500;
  color: ${color.ink};
`
