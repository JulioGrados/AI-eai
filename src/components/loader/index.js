import styled from 'styled-components'
import { Icon } from 'antd'

import { LogoMark } from '../logo'
import { color, space, text } from '../../styles/theme'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${space.lg};
`

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: ${space.sm};
  font-size: ${text.small};
  color: ${color.inkMuted};
`

export const Loader = ({ text: label = 'Cargando...' }) => (
  <Wrap>
    <LogoMark size={38} id='loader' />
    <Label>
      <Icon type='loading' style={{ color: color.brand }} />
      {label}
    </Label>
  </Wrap>
)
