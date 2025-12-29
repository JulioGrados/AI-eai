import { Layout } from 'antd'
import styled from 'styled-components'

const { Content, Footer } = Layout

export const BaseLogo = styled.div`
  height: 32px;
  margin: 16px;
  text-align: center;
  font-size: 18px;
  color: white;
  font-weight: 600;
`

export const BaseLogoImg = styled.img`
  height: 100%;
`

export const BaseFooter = styled(Footer)`
  text-align: center;
`

export const BaseLayout = styled(Layout)`
  min-height: 100vh;
`

export const BaseContent = styled(Layout)`
  background-color: #f4f7fd;
`

export const BaseBody = styled(Content)`
  margin: 30px 40px;
`
