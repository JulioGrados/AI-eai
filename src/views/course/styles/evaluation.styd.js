import styled from 'styled-components'

export const EvaluationContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const EvaluationHeader = styled.div`
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

export const ModuleTitleInput = styled.input`
  font-size: 24px;
  font-weight: 600;
  border: none;
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background-color: #f5f5f5;
  }
  &:focus {
    outline: none;
    background-color: #e6f7ff;
    border: 1px solid #1890ff;
  }
`

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
  height: calc(100vh - 250px);
`

export const LeftPanel = styled.div`
  border-right: 1px solid #f0f0f0;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const GenerateSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const GenerateButton = styled.button`
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
  justify-content: center;
  gap: 8px;
  &:hover {
    background: #40a9ff;
  }
  &:disabled {
    background: #d9d9d9;
    cursor: not-allowed;
  }
`

export const PromptInput = styled.textarea`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px;
  font-size: 13px;
  resize: vertical;
  min-height: 80px;
  &:focus {
    outline: none;
    border-color: #1890ff;
  }
`

export const VersionList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const VersionItem = styled.div`
  padding: 12px;
  border: 1px solid ${props => props.isActive ? '#1890ff' : '#d9d9d9'};
  background: ${props => props.isActive ? '#e6f7ff' : 'white'};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  &:hover {
    background: ${props => props.isActive ? '#e6f7ff' : '#fafafa'};
  }
`

export const VersionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const VersionNumber = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #262626;
`

export const VersionDate = styled.div`
  font-size: 12px;
  color: #8c8c8c;
`

export const FavoriteIcon = styled.span`
  cursor: pointer;
  font-size: 18px;
  color: ${props => props.isFavorite ? '#fadb14' : '#d9d9d9'};
  &:hover {
    color: ${props => props.isFavorite ? '#ffc53d' : '#bfbfbf'};
  }
`

export const RightPanel = styled.div`
  padding: 24px;
  overflow-y: auto;
  background: #fafafa;
  border-radius: 4px;
`

export const PromptDisplay = styled.div`
  background: #f5f5f5;
  border-left: 3px solid #1890ff;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 4px;
  font-size: 13px;
  color: #595959;
  line-height: 1.6;
`

export const PromptLabel = styled.div`
  font-weight: 600;
  color: #262626;
  margin-bottom: 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const ContentText = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  font-size: 14px;
  line-height: 1.8;
  color: #595959;
  white-space: pre-wrap;
  word-wrap: break-word;
`

export const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const QuestionCard = styled.div`
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
`

export const QuestionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`

export const QuestionNumber = styled.div`
  background: #1890ff;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  flex-shrink: 0;
`

export const QuestionText = styled.div`
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: #262626;
  font-weight: 500;
`

export const QuestionInput = styled.input`
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: #262626;
  font-weight: 500;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 8px 12px;
  &:focus {
    outline: none;
    border-color: #1890ff;
  }
`

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 40px;
`

export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 6px;
  background: ${props => props.isCorrect ? '#f6ffed' : '#fafafa'};
  border: 1px solid ${props => props.isCorrect ? '#b7eb8f' : '#e8e8e8'};
`

export const OptionLabel = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.isCorrect ? '#52c41a' : 'white'};
  color: ${props => props.isCorrect ? 'white' : '#8c8c8c'};
  border: 2px solid ${props => props.isCorrect ? '#52c41a' : '#d9d9d9'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
`

export const OptionText = styled.div`
  flex: 1;
  font-size: 14px;
  color: #595959;
`

export const OptionInput = styled.input`
  flex: 1;
  font-size: 14px;
  color: #595959;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 6px 10px;
  &:focus {
    outline: none;
    border-color: #1890ff;
  }
`

export const SaveButton = styled.button`
  background: #52c41a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  &:hover {
    background: #73d13d;
  }
  &:disabled {
    background: #d9d9d9;
    cursor: not-allowed;
  }
`

export const CorrectBadge = styled.div`
  background: #52c41a;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`
