import styled from 'styled-components'

export const CourseDetailContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const CourseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`

export const BackButton = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`

export const CourseTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  flex: 1;
`

export const ModuleContainer = styled.div`
  margin-bottom: 16px;
`

export const ModuleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`

export const ModuleTitle = styled.span`
  flex: 1;
  font-weight: 500;
  font-size: 15px;
`

export const ModuleInfo = styled.span`
  color: #8c8c8c;
  font-size: 14px;
`

export const ChapterList = styled.div`
  padding-left: 40px;
  margin-top: 8px;
`

export const ChapterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  &:hover {
    background: #fafafa;
  }
`

export const ChapterTitle = styled.span`
  flex: 1;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`

export const ChapterWordCount = styled.span`
  color: #8c8c8c;
  font-size: 13px;
`

export const ActionIcon = styled.span`
  cursor: pointer;
  color: #8c8c8c;
  font-size: 16px;
  &:hover {
    color: #1890ff;
  }
`
