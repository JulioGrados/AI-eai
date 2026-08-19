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

export const CourseListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.md};
  margin-bottom: ${space.xl};

  ${media.sm} {
    flex-wrap: wrap;
  }
`

export const SearchField = styled.div`
  position: relative;
  flex: 1;
  max-width: 380px;

  i {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${color.inkFaint};
    font-size: 14px;
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0 14px 0 38px;
    font-family: inherit;
    font-size: ${text.body};
    color: ${color.ink};
    background: ${color.surface};
    border: 1px solid ${color.line};
    border-radius: ${radius.sm};
    transition: all ${transition.fast};

    &::placeholder {
      color: ${color.inkFaint};
    }

    &:hover {
      border-color: ${color.lineStrong};
    }

    &:focus {
      outline: none;
      border-color: ${color.brand};
      box-shadow: 0 0 0 3px ${color.brandTint};
    }
  }
`

export const ResultCount = styled.span`
  font-size: ${text.small};
  color: ${color.inkFaint};
  white-space: nowrap;
`

export const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  gap: ${space.lg};
`

export const CourseCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  padding: 20px;
  cursor: pointer;
  transition: border-color ${transition.base}, box-shadow ${transition.base}, transform ${transition.base};

  &:hover {
    border-color: ${color.brandTintStrong};
    box-shadow: ${shadow.md};
    transform: translateY(-2px);
  }
`

export const CourseCardHeader = styled.header`
  display: flex;
  align-items: flex-start;
  gap: ${space.md};
  margin-bottom: ${space.md};
`

export const CourseIcon = styled.div`
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: ${radius.md};
  background: ${color.brandTint};
  color: ${color.brand};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CourseTitle = styled.h3`
  flex: 1;
  min-width: 0;
  font-size: 15px;
  font-weight: 600;
  color: ${color.ink};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const CourseActions = styled.div`
  display: flex;
  gap: 2px;
  flex: none;
  opacity: 0;
  transition: opacity ${transition.fast};

  ${CourseCard}:hover & {
    opacity: 1;
  }
`

export const CourseSubject = styled.p`
  font-size: ${text.small};
  color: ${color.inkMuted};
  margin: 0 0 ${space.lg};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 20px;
`

export const CourseTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: ${space.lg};
`

export const CourseMeta = styled.footer`
  display: flex;
  align-items: center;
  gap: ${space.lg};
  margin-top: auto;
  padding-top: ${space.md};
  border-top: 1px solid ${color.line};
`

export const SkeletonCard = styled.div`
  background: ${color.surface};
  border: 1px solid ${color.line};
  border-radius: ${radius.lg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: ${space.md};
`
