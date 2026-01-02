import { useState, useEffect } from 'react'
import { Tabs, Icon, Collapse, Input, message } from 'antd'
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
  CourseDetailContainer,
  CourseHeader,
  BackButton,
  CourseTitle,
  ChapterList,
  ChapterItem,
  ChapterTitle,
  ChapterWordCount,
  ActionIcon
} from '../styles/detail.styd'

const { TabPane } = Tabs
const { Panel } = Collapse

// Componente Sortable para un módulo individual
const SortableModulePanel = ({
  module,
  index,
  courseId,
  editingModuleId,
  editingModuleName,
  setEditingModuleId,
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
    opacity: isDragging ? 0.5 : 1,
    marginBottom: '12px'
  }

  const handleToggle = (e) => {
    // Solo toggle si no es un clic en botones de acción
    if (e.target.closest('[data-action-button]') || e.target.closest('[data-drag-handle]')) {
      return
    }
    onToggle()
  }

  return (
    <div ref={setNodeRef} style={style}>
      <div style={{
        border: '1px solid #d9d9d9',
        borderRadius: '2px',
        backgroundColor: 'white'
      }}>
        {/* Header del módulo */}
        <div
          onClick={handleToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            cursor: 'pointer',
            borderBottom: isActive ? '1px solid #d9d9d9' : 'none'
          }}
        >
          {/* Icono de expansión */}
          <Icon
            type={isActive ? 'down' : 'right'}
            style={{ fontSize: '12px', color: '#8c8c8c', transition: 'transform 0.3s' }}
          />

          {/* Icono de drag handle */}
          <div
            data-drag-handle
            {...attributes}
            {...listeners}
            style={{
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              touchAction: 'none'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon type="menu" style={{ fontSize: '16px', color: '#8c8c8c' }} />
          </div>

          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#1890ff',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: '14px'
          }}>
            {module.order || index + 1}
          </div>

          {editingModuleId === module._id ? (
            <Input
              value={editingModuleName}
              onChange={(e) => setEditingModuleName(e.target.value)}
              onPressEnter={(e) => handleSaveModule(e, module._id)}
              onClick={(e) => e.stopPropagation()}
              style={{ flex: 1, marginRight: '8px' }}
              autoFocus
            />
          ) : (
            <span style={{ fontWeight: 500 }}>{module.name}</span>
          )}

          <span style={{ color: '#8c8c8c', fontSize: '13px' }}>
            • {module.chaptersCount || 0} clases
          </span>
          <div style={{ flex: 1 }} />

          {editingModuleId === module._id ? (
            <>
              <Icon
                data-action-button
                type="check"
                style={{ color: '#52c41a', cursor: 'pointer' }}
                onClick={(e) => handleSaveModule(e, module._id)}
              />
              <Icon
                data-action-button
                type="close"
                style={{ color: '#ff4d4f', cursor: 'pointer' }}
                onClick={handleCancelModuleEdit}
              />
            </>
          ) : (
            <>
              <Icon
                data-action-button
                type="edit"
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleEditModule(e, module)}
              />
              <Icon
                data-action-button
                type="delete"
                style={{ color: '#ff4d4f', cursor: 'pointer' }}
              />
            </>
          )}
        </div>

        {/* Contenido colapsable */}
        {isActive && (
          <div style={{ padding: '16px' }}>
            <ModuleChapters
              moduleId={module._id}
              courseId={courseId}
              handleChapterClick={handleChapterClick}
            />
          </div>
        )}
      </div>
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
          console.log('Capítulos obtenidos para módulo', moduleId, ':', response)
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
    return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando capítulos...</div>
  }

  return (
    <ChapterList>
      {chapters.map((chapter) => (
        <ChapterItem key={chapter._id}>
          <Icon type="menu" style={{ color: '#8c8c8c' }} />
          {editingChapterId === chapter._id ? (
            <Input
              value={editingChapterName}
              onChange={(e) => setEditingChapterName(e.target.value)}
              onPressEnter={(e) => handleSaveChapter(e, chapter._id)}
              onClick={(e) => e.stopPropagation()}
              style={{ flex: 1, marginRight: '8px' }}
              autoFocus
            />
          ) : (
            <ChapterTitle onClick={() => handleChapterClick(chapter._id)}>
              {chapter.name}
            </ChapterTitle>
          )}
          {/* <ChapterWordCount>{chapter.wordCount || 0} palabras</ChapterWordCount> */}
          {editingChapterId === chapter._id ? (
            <>
              <ActionIcon onClick={(e) => handleSaveChapter(e, chapter._id)}>
                <Icon type="check" style={{ color: '#52c41a' }} />
              </ActionIcon>
              <ActionIcon onClick={handleCancelEdit}>
                <Icon type="close" style={{ color: '#ff4d4f' }} />
              </ActionIcon>
            </>
          ) : (
            <>
              <ActionIcon onClick={(e) => handleEditChapter(e, chapter)}>
                <Icon type="edit" />
              </ActionIcon>
              {/* <ActionIcon>
                <Icon type="delete" style={{ color: '#ff4d4f' }} />
              </ActionIcon> */}
            </>
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
  const { modules, update: updateModule, reload: reloadModules } = useModules({ course: courseId })

  const course = courses[0] || {}

  // Configurar sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Requiere mover el mouse 8px antes de activar el drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  // Sincronizar módulos locales con los del estado global
  useEffect(() => {
    // Solo actualizar si no estamos en medio de un drag and drop
    if (modules && modules.length > 0 && !isDragging) {
      // Ordenar módulos por el campo 'order' antes de asignarlos
      const sortedModules = [...modules].sort((a, b) => (a.order || 0) - (b.order || 0))
      setLocalModules(sortedModules)
    }
  }, [modules, isDragging])

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
      const sortedModules = [...modules].sort((a, b) => (a.order || 0) - (b.order || 0))
      setLocalModules(sortedModules)
    } finally {
      // Permitir sincronización después de completar la actualización
      setIsDragging(false)
    }
  }

  return (
    <CourseDetailContainer>
      <CourseHeader>
        <BackButton onClick={handleBack}>
          <Icon type="left" />
        </BackButton>
        <CourseTitle>{course.name || 'Cargando...'}</CourseTitle>
        <Icon type="edit" style={{ fontSize: '18px', cursor: 'pointer' }} />
        {/* <Icon type="delete" style={{ fontSize: '18px', cursor: 'pointer', color: '#ff4d4f' }} /> */}
      </CourseHeader>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <span>
              <Icon type="folder" />
              Contenido
            </span>
          }
          key="contenido"
        >
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
              {localModules.map((module, index) => (
                <SortableModulePanel
                  key={module._id}
                  module={module}
                  index={index}
                  courseId={courseId}
                  editingModuleId={editingModuleId}
                  editingModuleName={editingModuleName}
                  setEditingModuleId={setEditingModuleId}
                  setEditingModuleName={setEditingModuleName}
                  handleEditModule={handleEditModule}
                  handleSaveModule={handleSaveModule}
                  handleCancelModuleEdit={handleCancelModuleEdit}
                  handleChapterClick={handleChapterClick}
                  isActive={activePanels.includes(module._id)}
                  onToggle={() => handleTogglePanel(module._id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </TabPane>

        <TabPane
          tab={
            <span>
              <Icon type="file-text" />
              Evaluaciones
            </span>
          }
          key="evaluaciones"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {localModules.map((module, index) => (
              <div
                key={module._id}
                onClick={(e) => handleModuleEvaluation(e, courseId, module._id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  background: 'white',
                  border: '1px solid #e8e8e8',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#1890ff',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '14px'
                }}>
                  {module.order || index + 1}
                </div>
                <span style={{ fontWeight: 500 }}>{module.name}</span>
                <div style={{ flex: 1 }} />
                <span style={{ color: '#8c8c8c', fontSize: '13px', marginRight: '8px' }}>
                  {module.questionCount || 0} preguntas
                </span>
                {/* <Icon
                  type="edit"
                  onClick={(e) => handleModuleEvaluation(e, courseId, module._id)}
                  style={{ cursor: 'pointer' }}
                />
                <Icon type="delete" style={{ color: '#ff4d4f', cursor: 'pointer' }} /> */}
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </CourseDetailContainer>
  )
}
