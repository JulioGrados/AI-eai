import React from 'react'
import { Icon, Modal, message } from 'antd'
import Router from 'next/router'
import {
  CourseListContainer,
  ListHeader,
  ListTitle,
  CreateButton,
  CourseGrid,
  CourseCard,
  CourseCardHeader,
  CourseTitle,
  CourseActions,
  ActionButton,
  CourseInfo,
  CourseDetail,
  CourseMeta,
  MetaItem,
  EmptyState,
  EmptyIcon,
  EmptyText,
  EmptySubtext
} from '../styles/list.styd'

// Mock data - esto vendrá del backend después
const mockCourses = [
  {
    id: '6918f824d8d7acfdc32b2eff',
    title: 'Curso de Marketing Digital',
    subject: 'Marketing digital',
    language: 'Spanish',
    academicLevel: 'Formación continua',
    modulesCount: 10,
    chaptersCount: 60,
    createdAt: '2024-03-15',
    updatedAt: '2024-03-20'
  },
  {
    id: '6918f824d8d7acfdc32b2f00',
    title: 'Fundamentos de SEO',
    subject: 'SEO y posicionamiento web',
    language: 'Spanish',
    academicLevel: 'Formación continua',
    modulesCount: 8,
    chaptersCount: 48,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-18'
  },
  {
    id: '6918f824d8d7acfdc32b2f01',
    title: 'Estrategias de Redes Sociales',
    subject: 'Social media marketing',
    language: 'Spanish',
    academicLevel: 'Formación continua',
    modulesCount: 6,
    chaptersCount: 36,
    createdAt: '2024-03-05',
    updatedAt: '2024-03-15'
  }
]

import { useCourses } from '../../../hooks'

export const CourseList = () => {

  const { courses, remove } = useCourses({})
  
  const handleCreateCourse = () => {
    Router.push('/cursos/crear')
  }

  const handleCourseClick = (courseId) => {
    Router.push(`/cursos/${courseId}`)
  }

  const handleEditCourse = (e, courseId) => {
    e.stopPropagation()
    // TODO: Implementar edición de curso
    console.log('Edit course:', courseId)
  }

  const handleDeleteCourse = (e, courseId) => {
    e.stopPropagation()

    Modal.confirm({
      title: '¿Estás seguro de eliminar este curso?',
      content: 'Esta acción no se puede deshacer. Se eliminarán todos los módulos, lecciones y capítulos asociados.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          message.loading('Eliminando curso...', 0)
          await remove(courseId)
          message.destroy()
          message.success('Curso eliminado exitosamente')
        } catch (error) {
          message.destroy()
          message.error('Error al eliminar el curso. Por favor intenta nuevamente.')
          console.error('Error deleting course:', error)
        }
      }
    })
  }

  return (
    <CourseListContainer>
      <ListHeader>
        <ListTitle>Todos los cursos</ListTitle>
        <CreateButton onClick={handleCreateCourse}>
          <Icon type="plus" />
          Crear nuevo curso
        </CreateButton>
      </ListHeader>

      {courses.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <Icon type="book" />
          </EmptyIcon>
          <EmptyText>No hay cursos creados</EmptyText>
          <EmptySubtext>Comienza creando tu primer curso con IA</EmptySubtext>
        </EmptyState>
      ) : (
        <CourseGrid>
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              onClick={() => handleCourseClick(course._id)}
            >
              <CourseCardHeader>
                <CourseTitle>{course.name}</CourseTitle>
                <CourseActions>
                  {/* <ActionButton onClick={(e) => handleEditCourse(e, course._id)}>
                    <Icon type="edit" />
                  </ActionButton> */}
                  <ActionButton
                    danger
                    onClick={(e) => handleDeleteCourse(e, course._id)}
                  >
                    <Icon type="delete" />
                  </ActionButton>
                </CourseActions>
              </CourseCardHeader>

              <CourseInfo>
                <CourseDetail>
                  <Icon type="tag" />
                  {course.subject}
                </CourseDetail>
                <CourseDetail>
                  <Icon type="global" />
                  {course.language}
                </CourseDetail>
                <CourseDetail>
                  <Icon type="book" />
                  {course.academicLevel}
                </CourseDetail>
              </CourseInfo>

              <CourseMeta>
                <MetaItem>
                  <Icon type="folder" />
                  {course.modulesCount} módulos
                </MetaItem>
                <MetaItem>
                  <Icon type="file-text" />
                  {course.chaptersCount} capítulos
                </MetaItem>
              </CourseMeta>
            </CourseCard>
          ))}
        </CourseGrid>
      )}
    </CourseListContainer>
  )
}
