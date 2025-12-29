import { useState, useEffect } from 'react'
import { Tabs, Icon, Collapse, Input, message } from 'antd'
import { useRouter } from 'next/router'
import { useCourses, useModules } from '../../../hooks'
import { listChapters, updateChapter } from 'utils/api/chapter'
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
          <ChapterWordCount>{chapter.wordCount || 0} palabras</ChapterWordCount>
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
              <ActionIcon>
                <Icon type="delete" style={{ color: '#ff4d4f' }} />
              </ActionIcon>
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

  // Obtener datos del curso y módulos
  const { courses } = useCourses({ query: { _id: courseId } })
  const { modules, update: updateModule } = useModules({ course: courseId })

  const course = courses[0] || {}

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

  return (
    <CourseDetailContainer>
      <CourseHeader>
        <BackButton onClick={handleBack}>
          <Icon type="left" />
        </BackButton>
        <CourseTitle>{course.name || 'Cargando...'}</CourseTitle>
        <Icon type="edit" style={{ fontSize: '18px', cursor: 'pointer' }} />
        <Icon type="delete" style={{ fontSize: '18px', cursor: 'pointer', color: '#ff4d4f' }} />
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
          <Collapse
            bordered={false}
            expandIconPosition="left"
            style={{ background: 'white' }}
          >
            {modules.map((module, index) => (
              <Panel
                header={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                          type="check"
                          style={{ color: '#52c41a', cursor: 'pointer' }}
                          onClick={(e) => handleSaveModule(e, module._id)}
                        />
                        <Icon
                          type="close"
                          style={{ color: '#ff4d4f', cursor: 'pointer' }}
                          onClick={handleCancelModuleEdit}
                        />
                      </>
                    ) : (
                      <>
                        <Icon
                          type="edit"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => handleEditModule(e, module)}
                        />
                        <Icon type="delete" style={{ color: '#ff4d4f', cursor: 'pointer' }} />
                      </>
                    )}
                  </div>
                }
                key={module._id}
              >
                <ModuleChapters
                  moduleId={module._id}
                  courseId={courseId}
                  handleChapterClick={handleChapterClick}
                />
              </Panel>
            ))}
          </Collapse>
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
            {modules.map((module, index) => (
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
