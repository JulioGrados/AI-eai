import { Icon } from 'antd'
import Router from 'next/router'

import { useCourses } from '../../../hooks'
import { LogoMark } from '../../../components/logo'
import {
  Panel,
  PageHead,
  SectionTitle,
  GhostButton,
  Stat,
  StatGrid,
  MetaText,
  EmptyState,
  PrimaryButton
} from '../../../components/ui'
import {
  HomeContainer,
  Hero,
  HeroBody,
  HeroTitle,
  HeroText,
  HeroActions,
  HeroButton,
  RecentList,
  RecentItem,
  RecentIcon,
  RecentBody,
  RecentName,
  RecentSubject
} from '../styles/home.styd'

export const Dashboard = () => {
  const { courses } = useCourses({})

  const totals = courses.reduce(
    (acc, course) => ({
      modules: acc.modules + (course.modulesCount || 0),
      chapters: acc.chapters + (course.chaptersCount || 0)
    }),
    { modules: 0, chapters: 0 }
  )

  // Los más recientes primero; si no hay fecha, se conserva el orden del listado
  const recentCourses = [...courses]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 5)

  const seeAllButton = (
    <GhostButton onClick={() => Router.push('/cursos')}>
      Ver todos
      <Icon type='right' />
    </GhostButton>
  )

  return (
    <HomeContainer>
      <Hero>
        <HeroBody>
          <div style={{ marginBottom: 18 }}>
            <LogoMark size={34} id='hero' />
          </div>
          <HeroTitle>Genera cursos completos con inteligencia artificial</HeroTitle>
          <HeroText>
            Sube el material de cada tema y el asistente arma los módulos, las lecciones
            y las evaluaciones listas para revisar.
          </HeroText>
        </HeroBody>
        <HeroActions>
          <HeroButton onClick={() => Router.push('/cursos/crear')}>
            <Icon type='plus' />
            Crear curso
          </HeroButton>
        </HeroActions>
      </Hero>

      <StatGrid>
        <Stat icon='read' value={courses.length} label='Cursos creados' />
        <Stat icon='folder' value={totals.modules} label='Módulos generados' />
        <Stat icon='file-text' value={totals.chapters} label='Capítulos generados' />
      </StatGrid>

      <Panel>
        <PageHead
          tight
          actions={courses.length > 0 ? seeAllButton : null}
        >
          <SectionTitle style={{ margin: 0 }}>Cursos recientes</SectionTitle>
        </PageHead>

        {recentCourses.length === 0 ? (
          <EmptyState
            icon='read'
            title='Todavía no hay cursos'
            text='Cuando generes tu primer curso aparecerá aquí para retomarlo rápido.'
            action={
              <PrimaryButton onClick={() => Router.push('/cursos/crear')}>
                <Icon type='plus' />
                Crear curso
              </PrimaryButton>
            }
          />
        ) : (
          <RecentList>
            {recentCourses.map(course => (
              <RecentItem
                key={course._id}
                onClick={() => Router.push(`/cursos/${course._id}`)}
              >
                <RecentIcon>
                  <Icon type='read' />
                </RecentIcon>
                <RecentBody>
                  <RecentName>{course.name}</RecentName>
                  <RecentSubject>{course.subject || 'Sin materia asignada'}</RecentSubject>
                </RecentBody>
                <MetaText>
                  <Icon type='folder' />
                  {course.modulesCount || 0}
                </MetaText>
                <MetaText>
                  <Icon type='file-text' />
                  {course.chaptersCount || 0}
                </MetaText>
                <Icon type='right' style={{ fontSize: 11, color: '#95a1b5' }} />
              </RecentItem>
            ))}
          </RecentList>
        )}
      </Panel>
    </HomeContainer>
  )
}
