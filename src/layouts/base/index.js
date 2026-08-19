import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Icon } from 'antd'

import { NavBar } from '../../containers/navbar'
import { Logo } from '../../components/logo'

import {
  BaseLayout,
  BaseSider,
  SiderBrand,
  SiderSectionLabel,
  SiderNav,
  NavLink,
  SiderSpacer,
  SiderFooter,
  BaseShell,
  BaseBody,
  BaseFooter
} from './styles'
import { layout } from '../../styles/theme'

/* Un único lugar donde vive la navegación: la clave coincide con la prop
   `current` que ya enviaba cada página, así no cambia nada aguas arriba */
const NAV_ITEMS = [
  { key: 'home', href: '/', icon: 'appstore', label: 'Inicio' },
  { key: 'cursos-todos', href: '/cursos', icon: 'read', label: 'Cursos' },
  { key: 'cursos-crear', href: '/cursos/crear', icon: 'plus-circle', label: 'Crear curso' }
]

const PAGE_TITLES = {
  home: 'Inicio',
  'cursos-todos': 'Cursos',
  'cursos-crear': 'Crear curso'
}

export const Base = ({ current, currentMenu, title, children }) => {
  const [collapsed, setCollapsed] = useState(false)

  // En pantallas medianas el sidebar arranca colapsado para dar aire al contenido
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1100) {
      setCollapsed(true)
    }
  }, [])

  const toggle = () => setCollapsed(value => !value)

  return (
    <BaseLayout>
      <BaseSider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={layout.siderWidth}
        collapsedWidth={layout.siderCollapsed}
      >
        <Link href='/'>
          <SiderBrand $collapsed={collapsed ? 1 : 0}>
            <Logo
              variant={collapsed ? 'mark' : 'full'}
              size={collapsed ? 30 : 28}
              id='sider'
            />
          </SiderBrand>
        </Link>

        <SiderSectionLabel $collapsed={collapsed ? 1 : 0}>Plataforma</SiderSectionLabel>

        <SiderNav>
          {NAV_ITEMS.map(item => (
            <Link key={item.key} href={item.href}>
              <NavLink
                href={item.href}
                $active={current === item.key ? 1 : 0}
                $collapsed={collapsed ? 1 : 0}
                title={item.label}
              >
                <Icon type={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            </Link>
          ))}
        </SiderNav>

        <SiderSpacer />

        <SiderFooter $collapsed={collapsed ? 1 : 0}>
          {collapsed ? 'EAI' : 'Escuela Americana de Innovación'}
        </SiderFooter>
      </BaseSider>

      <BaseShell $collapsed={collapsed ? 1 : 0}>
        <NavBar
          section={PAGE_TITLES[current] || 'Cursos IA'}
          title={title}
          collapsed={collapsed}
          onToggle={toggle}
        />
        <BaseBody>{children}</BaseBody>
        <BaseFooter>Escuela Americana de Innovación © 2026</BaseFooter>
      </BaseShell>
    </BaseLayout>
  )
}
