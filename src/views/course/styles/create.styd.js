import styled from 'styled-components'

export const CreateCourseContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const CreateCourseTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
`

export const FormSection = styled.div`
  margin-bottom: 0px;
`

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`

export const ThemeInputContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
`

export const AddThemeButton = styled.a`
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  margin-top: 8px;
  &:hover {
    text-decoration: underline;
  }
`

export const FileUploadSection = styled.div`
  margin-bottom: 24px;
`
