import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavBar } from '../../containers/navbar'

import {
  BaseLogo,
  BaseLayout,
  BaseContent,
  BaseBody,
  BaseFooter
} from './styles'

const { Sider } = Layout
const { SubMenu } = Menu

export const Base = ({ current, currentMenu, children }) => {
  const [collapsed, onCollapse] = useState(false)
  return (
    <BaseLayout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => onCollapse(!collapsed)}
      >
        <BaseLogo>
          <img
            src="/static/img/eai_color.svg"
            alt="EAI Logo"
            style={{ width: '100%', height: '100%' }}
          />
        </BaseLogo>
        <Menu
          theme='dark'
          selectedKeys={[current]}
          defaultOpenKeys={['cursos']}
          openKeys={['cursos']}
          mode='inline'
        >
          <SubMenu
            key='cursos'
            title={
              <span>
                <Icon type='book' />
                <span>Cursos</span>
              </span>
            }
          >
            <Menu.Item key='cursos-todos'>
              <Link href='/cursos'>
                <a>Todos</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='cursos-crear'>
              <Link href='/cursos/crear'>
                <a>Crear curso</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <BaseContent>
        <NavBar />
        <BaseBody>{children}</BaseBody>
        <BaseFooter>Escuela Americana de Innovación ©2026</BaseFooter>
      </BaseContent>
    </BaseLayout>
  )
}
