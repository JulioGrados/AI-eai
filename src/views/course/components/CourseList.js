import React, { useState } from 'react'
import { Icon, Modal, message } from 'antd'
import Router from 'next/router'

import { useCourses } from '../../../hooks'
import {
  PageHead,
  PrimaryButton,
  IconButton,
  Chip,
  MetaText,
  EmptyState,
  SkeletonBlock
} from '../../../components/ui'
import {
  CourseListContainer,
  Toolbar,
  SearchField,
  ResultCount,
  CourseGrid,
  CourseCard,
  CourseCardHeader,
  CourseIcon,
  CourseTitle,
  CourseActions,
  CourseSubject,
  CourseTags,
  CourseMeta,
  SkeletonCard
} from '../styles/list.styd'

const normalize = value => (value || '').toString().toLowerCase().trim()

export const CourseList = () => {
  const { courses, loading, remove } = useCourses({})
  const [search, setSearch] = useState('')

  const handleCreateCourse = () => {
    Router.push('/cursos/crear')
  }

  const handleCourseClick = (courseId) => {
    Router.push(`/cursos/${courseId}`)
  }

  const handleDeleteCourse = (e, course) => {
    e.stopPropagation()

    Modal.confirm({
      title: `¿Eliminar "${course.name}"?`,
      content: 'Esta acción no se puede deshacer. Se eliminarán todos los módulos, lecciones y capítulos asociados.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          message.loading('Eliminando curso...', 0)
          await remove(course._id)
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

  const term = normalize(search)
  const visibleCourses = term
    ? courses.filter(course =>
      normalize(course.name).includes(term) ||
      normalize(course.subject).includes(term)
    )
    : courses

  const isEmpty = !loading && courses.length === 0
  const isFiltered = !loading && courses.length > 0 && visibleCourses.length === 0

  return (
    <CourseListContainer>
      <PageHead
        title='Cursos'
        subtitle={
          courses.length
            ? `${courses.length} ${courses.length === 1 ? 'curso generado' : 'cursos generados'} con IA`
            : 'Genera y administra los cursos creados con IA'
        }
        actions={
          <PrimaryButton onClick={handleCreateCourse}>
            <Icon type='plus' />
            Crear curso
          </PrimaryButton>
        }
      />

      {!isEmpty && (
        <Toolbar>
          <SearchField>
            <Icon type='search' />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Buscar por título o materia...'
            />
          </SearchField>
          {term && (
            <ResultCount>
              {visibleCourses.length} de {courses.length}
            </ResultCount>
          )}
        </Toolbar>
      )}

      {loading && courses.length === 0 && (
        <CourseGrid>
          {[0, 1, 2, 3, 4, 5].map(index => (
            <SkeletonCard key={index}>
              <SkeletonBlock $width='60%' $height='16px' />
              <SkeletonBlock $width='85%' />
              <SkeletonBlock $width='40%' />
            </SkeletonCard>
          ))}
        </CourseGrid>
      )}

      {isEmpty && (
        <EmptyState
          icon='read'
          title='Todavía no hay cursos'
          text='Crea tu primer curso: sube el material y la IA arma los módulos, las lecciones y las evaluaciones.'
          action={
            <PrimaryButton onClick={handleCreateCourse}>
              <Icon type='plus' />
              Crear curso
            </PrimaryButton>
          }
        />
      )}

      {isFiltered && (
        <EmptyState
          icon='search'
          title='Sin resultados'
          text={`No encontramos cursos que coincidan con "${search}".`}
        />
      )}

      {visibleCourses.length > 0 && (
        <CourseGrid>
          {visibleCourses.map((course) => (
            <CourseCard
              key={course._id}
              onClick={() => handleCourseClick(course._id)}
            >
              <CourseCardHeader>
                <CourseIcon>
                  <Icon type='read' />
                </CourseIcon>
                <CourseTitle>{course.name}</CourseTitle>
                <CourseActions>
                  <IconButton
                    $danger
                    title='Eliminar curso'
                    onClick={(e) => handleDeleteCourse(e, course)}
                  >
                    <Icon type='delete' />
                  </IconButton>
                </CourseActions>
              </CourseCardHeader>

              <CourseSubject>{course.subject || 'Sin materia asignada'}</CourseSubject>

              <CourseTags>
                {course.language && <Chip>{course.language}</Chip>}
                {course.academicLevel && <Chip>{course.academicLevel}</Chip>}
              </CourseTags>

              <CourseMeta>
                <MetaText>
                  <Icon type='folder' />
                  {course.modulesCount || 0} módulos
                </MetaText>
                <MetaText>
                  <Icon type='file-text' />
                  {course.chaptersCount || 0} capítulos
                </MetaText>
              </CourseMeta>
            </CourseCard>
          ))}
        </CourseGrid>
      )}
    </CourseListContainer>
  )
}
