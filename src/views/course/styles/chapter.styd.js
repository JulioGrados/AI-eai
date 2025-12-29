import styled from 'styled-components'

export const ChapterContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const ChapterHeader = styled.div`
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

export const ChapterTitleInput = styled.input`
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

export const VersionNumber = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #262626;
`

export const VersionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  font-size: 15px;
  line-height: 1.8;
  color: #262626;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  /* Párrafos */
  p {
    margin-bottom: 16px;
    line-height: 1.8;
  }

  /* Encabezados */
  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-top: 32px;
    margin-bottom: 16px;
    color: #1a1a1a;
    line-height: 1.3;
    border-bottom: 2px solid #e8e8e8;
    padding-bottom: 12px;
  }

  h2 {
    font-size: 26px;
    font-weight: 700;
    margin-top: 28px;
    margin-bottom: 14px;
    color: #1a1a1a;
    line-height: 1.4;
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    margin-top: 24px;
    margin-bottom: 12px;
    color: #262626;
    line-height: 1.4;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 10px;
    color: #262626;
    line-height: 1.4;
  }

  h5, h6 {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
    color: #595959;
    line-height: 1.4;
  }

  /* Listas */
  ul, ol {
    margin-bottom: 16px;
    padding-left: 28px;
  }

  li {
    margin-bottom: 8px;
    line-height: 1.7;
  }

  /* Listas anidadas */
  li > ul,
  li > ol {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  /* Énfasis */
  strong {
    font-weight: 700;
    color: #1a1a1a;
  }

  em {
    font-style: italic;
  }

  /* Código inline */
  code {
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 13px;
    color: #d63384;
  }

  /* Bloques de código */
  pre {
    background: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 16px;
    overflow-x: auto;
    margin-bottom: 16px;
  }

  pre code {
    background: transparent;
    padding: 0;
    color: #262626;
    font-size: 14px;
    line-height: 1.6;
  }

  /* Citas */
  blockquote {
    border-left: 4px solid #1890ff;
    background: #f5f9ff;
    margin: 16px 0;
    padding: 12px 20px;
    color: #595959;
    font-style: italic;
  }

  blockquote p:last-child {
    margin-bottom: 0;
  }

  /* Enlaces */
  a {
    color: #1890ff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  /* Línea horizontal */
  hr {
    border: none;
    border-top: 2px solid #e8e8e8;
    margin: 24px 0;
  }

  /* Tablas */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
    font-size: 14px;
  }

  th {
    background: #fafafa;
    font-weight: 600;
    padding: 12px;
    border: 1px solid #e8e8e8;
    text-align: left;
  }

  td {
    padding: 10px 12px;
    border: 1px solid #e8e8e8;
  }

  tr:nth-child(even) {
    background: #fafafa;
  }

  /* Imágenes */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 16px 0;
  }

  /* Primer elemento sin margen superior */
  > *:first-child {
    margin-top: 0;
  }

  /* Último elemento sin margen inferior */
  > *:last-child {
    margin-bottom: 0;
  }
`
