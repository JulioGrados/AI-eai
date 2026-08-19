import { useState, useEffect } from 'react'
import { Tabs, Icon, Input, message } from 'antd'
import { useRouter } from 'next/router'
import { useCourses, useModules } from '../../../hooks'
import { listChapters, updateChapter } from 'utils/api/chapter'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {
  Panel,
  PageHead,
  IconButton,
  OrderBadge,
  Chip,
  MetaText,
  EmptyState,
  LoadingState
} from '../../../components/ui'
import {
  CourseDetailContainer,
  ModuleList,
  ModuleCard,
  ModuleHeader,
  Chevron,
  DragHandle,
  ModuleName,
  ModuleSpacer,
  ModuleActions,
  ModuleBody,
  ChapterList,
  ChapterItem,
  ChapterDot,
  ChapterTitle,
  ChapterWordCount,
  EvaluationList,
  EvaluationRow,
  EvaluationName
} from '../styles/detail.styd'

const { TabPane } = Tabs

// El store de módulos es compartido entre cursos: al pasar de un curso a otro
// puede seguir teniendo los del anterior hasta que llegue la consulta nueva
const belongsToCourse = (module, courseId) => {
  const ref = module.course && module.course.ref
  return !ref || (ref._id || ref).toString() === courseId
}

const modulesOfCourse = (modules, courseId) =>
  modules
    .filter(module => belongsToCourse(module, courseId))
    .sort((a, b) => (a.order || 0) - (b.order || 0))

// Componente Sortable para un módulo individual
const SortableModulePanel = ({
  module,
  index,
  courseId,
  editingModuleId,
  editingModuleName,
  setEditingModuleName,
  handleEditModule,
  handleSaveModule,
  handleCancelModuleEdit,
  handleChapterClick,
  isActive,
  onToggle
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: module._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const handleToggle = (e) => {
    // Solo toggle si no es un clic en botones de acción
    if (e.target.closest('[data-action-button]') || e.target.closest('[data-drag-handle]')) {
      return
    }
    onToggle()
  }

  const isEditing = editingModuleId === module._id

  return (
    <div ref={setNodeRef} style={style}>
      <ModuleCard $open={isActive}>
        <ModuleHeader onClick={handleToggle} $open={isActive}>
          <Chevron $open={isActive}>
            <Icon type='right' />
          </Chevron>

          <DragHandle
            data-drag-handle
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            title='Arrastra para reordenar'
          >
            <Icon type='menu' />
          </DragHandle>

          <OrderBadge>{module.order || index + 1}</OrderBadge>

          {isEditing ? (
            <Input
              value={editingModuleName}
              onChange={(e) => setEditingModuleName(e.target.value)}
              onPressEnter={(e) => handleSaveModule(e, module._id)}
              onClick={(e) => e.stopPropagation()}
              style={{ flex: 1, maxWidth: 420 }}
              autoFocus
            />
          ) : (
            <ModuleName>{module.name}</ModuleName>
          )}

          {!isEditing && (
            <Chip>{module.chaptersCount || 0} clases</Chip>
          )}

          <ModuleSpacer />

          <ModuleActions>
            {isEditing ? (
              <>
                <IconButton
                  data-action-button
                  title='Guardar'
                  onClick={(e) => handleSaveModule(e, module._id)}
                >
                  <Icon type='check' />
                </IconButton>
                <IconButton
                  data-action-button
                  $danger
                  title='Cancelar'
                  onClick={handleCancelModuleEdit}
                >
                  <Icon type='close' />
                </IconButton>
              </>
            ) : (
              <IconButton
                data-action-button
                title='Renombrar módulo'
                onClick={(e) => handleEditModule(e, module)}
              >
                <Icon type='edit' />
              </IconButton>
            )}
          </ModuleActions>
        </ModuleHeader>

        {isActive && (
          <ModuleBody>
            <ModuleChapters
              moduleId={module._id}
              courseId={courseId}
              handleChapterClick={handleChapterClick}
            />
          </ModuleBody>
        )}
      </ModuleCard>
    </div>
  )
}

// Componente para manejar los capítulos de un módulo específico
const ModuleChapters = ({ moduleId, courseId, handleChapterClick }) => {
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingChapterId, setEditingChapterId] = useState(null)
  const [editingChapterName, setEditingChapterName] = useState('')

  useEffect(() => {
    const fetchChapters = async () => {
      if (moduleId) {
        setLoading(true)
        try {
          const response = await listChapters({ query: { lesson: moduleId } })
          setChapters(Array.isArray(response) ? response : [])
        } catch (error) {
          console.error('Error fetching chapters:', error)
          setChapters([])
        } finally {
          setLoading(false)
        }
      }
    }

    fetchChapters()
  }, [moduleId])

  const handleEditChapter = (e, chapter) => {
    e.stopPropagation()
    setEditingChapterId(chapter._id)
    setEditingChapterName(chapter.name)
  }

  const handleSaveChapter = async (e, chapterId) => {
    e.stopPropagation()
    try {
      const response = await updateChapter(chapterId, { name: editingChapterName })
      if (response.success) {
        message.success('Capítulo actualizado correctamente')
        // Actualizar el capítulo en el estado local
        setChapters(chapters.map(ch =>
          ch._id === chapterId ? { ...ch, name: editingChapterName } : ch
        ))
        setEditingChapterId(null)
      } else {
        message.error('Error al actualizar el capítulo')
      }
    } catch (error) {
      console.error('Error updating chapter:', error)
      message.error('Error al actualizar el capítulo')
    }
  }

  const handleCancelEdit = (e) => {
    e.stopPropagation()
    setEditingChapterId(null)
    setEditingChapterName('')
  }

  if (loading) {
    return <LoadingState text='Cargando capítulos...' />
  }

  if (chapters.length === 0) {
    return (
      <EmptyState
        icon='file-text'
        title='Sin capítulos'
        text='Este módulo todavía no tiene capítulos generados.'
      />
    )
  }

  return (
    <ChapterList>
      {chapters.map((chapter) => (
        <ChapterItem key={chapter._id}>
          <ChapterDot $done={!!chapter.favoriteVersion} />
          {editingChapterId === chapter._id ? (
            <Input
              value={editingChapterName}
              onChange={(e) => setEditingChapterName(e.target.value)}
              onPressEnter={(e) => handleSaveChapter(e, chapter._id)}
              onClick={(e) => e.stopPropagation()}
              style={{ flex: 1, marginRight: 8 }}
              autoFocus
            />
          ) : (
            <ChapterTitle onClick={() => handleChapterClick(chapter._id)}>
              {chapter.name}
            </ChapterTitle>
          )}
          <ChapterWordCount>{chapter.wordCount || 0} palabras</ChapterWordCount>
          {editingChapterId === chapter._id ? (
            <>
              <IconButton title='Guardar' onClick={(e) => handleSaveChapter(e, chapter._id)}>
                <Icon type='check' />
              </IconButton>
              <IconButton $danger title='Cancelar' onClick={handleCancelEdit}>
                <Icon type='close' />
              </IconButton>
            </>
          ) : (
            <IconButton title='Renombrar capítulo' onClick={(e) => handleEditChapter(e, chapter)}>
              <Icon type='edit' />
            </IconButton>
          )}
        </ChapterItem>
      ))}
    </ChapterList>
  )
}

export const CourseDetail = ({ courseId }) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('contenido')
  const [editingModuleId, setEditingModuleId] = useState(null)
  const [editingModuleName, setEditingModuleName] = useState('')
  const [localModules, setLocalModules] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [activePanels, setActivePanels] = useState([])

  // Obtener datos del curso y módulos
  const { courses } = useCourses({ query: { _id: courseId } })
  const { modules, update: updateModule } = useModules({ course: courseId })

  const course = courses.find(item => item._id === courseId) || courses[0] || {}

  // Configurar sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8 // Requiere mover el mouse 8px antes de activar el drag
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  // Sincronizar módulos locales con los del estado global
  useEffect(() => {
    // Solo actualizar si no estamos en medio de un drag and drop
    if (isDragging) return

    // Se asigna aunque venga vacío: si no, al abrir un curso sin módulos
    // seguían viéndose los del curso anterior
    setLocalModules(modulesOfCourse(modules || [], courseId))
  }, [modules, isDragging, courseId])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleBack = () => {
    router.push('/cursos')
  }

  const handleChapterClick = (chapterId) => {
    router.push(`/cursos/${courseId}/capitulo/${chapterId}`)
  }

  const handleModuleEvaluation = async (e, courseId, moduleId) => {
    e.stopPropagation()

    try {
      // Obtener todos los capítulos del módulo
      const chaptersResponse = await listChapters({ query: { lesson: moduleId } })
      const chapters = Array.isArray(chaptersResponse) ? chaptersResponse : []

      // Verificar si hay capítulos
      if (chapters.length === 0) {
        message.warning('Este módulo no tiene capítulos todavía')
        return
      }

      // Verificar que todos los capítulos tengan una versión favorita
      const chaptersWithoutFavorite = chapters.filter(chapter => !chapter.favoriteVersion)

      if (chaptersWithoutFavorite.length > 0) {
        message.error(
          `No se puede acceder a la evaluación. ${chaptersWithoutFavorite.length} capítulo(s) no tienen una versión favorita seleccionada. Por favor, genera y marca una versión favorita para todos los capítulos.`
        )
        return
      }

      // Si todos los capítulos tienen versión favorita, navegar a la evaluación
      router.push(`/cursos/${courseId}/evaluacion/${moduleId}`)
    } catch (error) {
      console.error('Error validating chapters:', error)
      message.error('Error al validar los capítulos del módulo')
    }
  }

  const handleEditModule = (e, module) => {
    e.stopPropagation()
    setEditingModuleId(module._id)
    setEditingModuleName(module.name)
  }

  const handleSaveModule = async (e, moduleId) => {
    e.stopPropagation()
    try {
      await updateModule(moduleId, { name: editingModuleName })
      message.success('Módulo actualizado correctamente')
      setEditingModuleId(null)
    } catch (error) {
      console.error('Error updating module:', error)
      message.error('Error al actualizar el módulo')
    }
  }

  const handleCancelModuleEdit = (e) => {
    e.stopPropagation()
    setEditingModuleId(null)
    setEditingModuleName('')
  }

  const handleTogglePanel = (moduleId) => {
    setActivePanels(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      setIsDragging(false)
      return
    }

    const oldIndex = localModules.findIndex((m) => m._id === active.id)
    const newIndex = localModules.findIndex((m) => m._id === over.id)

    // Reordenar módulos localmente
    const newModules = arrayMove(localModules, oldIndex, newIndex)

    // Actualizar el order de cada módulo basado en su nueva posición
    const updatedModules = newModules.map((module, index) => ({
      ...module,
      order: index + 1
    }))

    // Actualizar estado local inmediatamente para UI fluida
    setLocalModules(updatedModules)
    setIsDragging(true)

    // Actualizar en el backend en segundo plano
    try {
      const promises = updatedModules.map((module, index) =>
        updateModule(module._id, { order: index + 1 })
      )
      await Promise.all(promises)

      message.success('Orden de módulos actualizado')
    } catch (error) {
      console.error('Error updating module order:', error)
      message.error('Error al actualizar el orden de los módulos')
      // Revertir cambios en caso de error
      setLocalModules(modulesOfCourse(modules || [], courseId))
    } finally {
      // Permitir sincronización después de completar la actualización
      setIsDragging(false)
    }
  }

  const subtitleParts = [course.subject, course.academicLevel].filter(Boolean)

  return (
    <CourseDetailContainer>
      <PageHead
        title={course.name || 'Cargando...'}
        subtitle={subtitleParts.join(' · ')}
        onBack={handleBack}
        actions={
          <MetaText>
            <Icon type='folder' />
            {localModules.length} módulos
          </MetaText>
        }
      />

      <Panel>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <Icon type='folder' />
                Contenido
              </span>
            }
            key='contenido'
          >
            {localModules.length === 0 ? (
              <EmptyState
                icon='folder-open'
                title='Sin módulos'
                text='Este curso todavía no tiene módulos generados.'
              />
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={localModules.map((m) => m._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ModuleList>
                    {localModules.map((module, index) => (
                      <SortableModulePanel
                        key={module._id}
                        module={module}
                        index={index}
                        courseId={courseId}
                        editingModuleId={editingModuleId}
                        editingModuleName={editingModuleName}
                        setEditingModuleName={setEditingModuleName}
                        handleEditModule={handleEditModule}
                        handleSaveModule={handleSaveModule}
                        handleCancelModuleEdit={handleCancelModuleEdit}
                        handleChapterClick={handleChapterClick}
                        isActive={activePanels.includes(module._id)}
                        onToggle={() => handleTogglePanel(module._id)}
                      />
                    ))}
                  </ModuleList>
                </SortableContext>
              </DndContext>
            )}
          </TabPane>

          <TabPane
            tab={
              <span>
                <Icon type='file-text' />
                Evaluaciones
              </span>
            }
            key='evaluaciones'
          >
            {localModules.length === 0 ? (
              <EmptyState
                icon='file-text'
                title='Sin evaluaciones'
                text='Cuando el curso tenga módulos podrás generar una evaluación para cada uno.'
              />
            ) : (
              <EvaluationList>
                {localModules.map((module, index) => (
                  <EvaluationRow
                    key={module._id}
                    onClick={(e) => handleModuleEvaluation(e, courseId, module._id)}
                  >
                    <OrderBadge>{module.order || index + 1}</OrderBadge>
                    <EvaluationName>{module.name}</EvaluationName>
                    <ModuleSpacer />
                    <MetaText>
                      <Icon type='question-circle' />
                      {module.questionCount || 0} preguntas
                    </MetaText>
                    <Icon type='right' style={{ fontSize: 11, color: '#95a1b5' }} />
                  </EvaluationRow>
                ))}
              </EvaluationList>
            )}
          </TabPane>
        </Tabs>
      </Panel>
    </CourseDetailContainer>
  )
}
