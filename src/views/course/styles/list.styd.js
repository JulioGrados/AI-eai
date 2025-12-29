import styled from 'styled-components'

export const CourseListContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const ListTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #262626;
`

export const CreateButton = styled.button`
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: #40a9ff;
  }
`

export const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`

export const CourseCard = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #1890ff;
  }
`

export const CourseCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`

export const CourseTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #262626;
  flex: 1;
`

export const CourseActions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${CourseCard}:hover & {
    opacity: 1;
  }
`

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #8c8c8c;
  display: flex;
  align-items: center;

  &:hover {
    color: ${props => props.danger ? '#ff4d4f' : '#1890ff'};
  }
`

export const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const CourseDetail = styled.div`
  font-size: 13px;
  color: #8c8c8c;
  display: flex;
  align-items: center;
  gap: 6px;
`

export const CourseMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
`

export const MetaItem = styled.div`
  font-size: 12px;
  color: #8c8c8c;
  display: flex;
  align-items: center;
  gap: 4px;
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #8c8c8c;
`

export const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  color: #d9d9d9;
`

export const EmptyText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  color: #595959;
`

export const EmptySubtext = styled.div`
  font-size: 14px;
  color: #8c8c8c;
`
