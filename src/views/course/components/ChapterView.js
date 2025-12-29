import React, { useState, useEffect } from 'react'
import { Icon, message } from 'antd'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import { useChapterVersions, useChapters } from '../../../hooks'
import {
  ChapterContainer,
  ChapterHeader,
  BackButton,
  ChapterTitleInput,
  ContentWrapper,
  LeftPanel,
  GenerateSection,
  GenerateButton,
  PromptInput,
  VersionList,
  VersionItem,
  VersionNumber,
  VersionInfo,
  VersionDate,
  FavoriteIcon,
  RightPanel,
  ContentText,
  PromptDisplay,
  PromptLabel
} from '../styles/chapter.styd'

export const ChapterView = ({ courseId, chapterId, chapter, loading }) => {
  const { create: createVersion, setFavorite, editContent } = useChapterVersions()
  const { get: getChapter } = useChapters()
  const [chapterTitle, setChapterTitle] = useState(chapter?.name || 'Capítulo sin título')
  const [editPrompt, setEditPrompt] = useState('')

  // Usar las versions del chapter traídas desde el backend
  const versions = chapter?.versions || []
  const favoriteVersion = chapter?.favoriteVersion

  // Por defecto, mostrar la favoriteVersion si existe, si no, la primera versión
  const [activeVersionId, setActiveVersionId] = useState(
    favoriteVersion?._id || versions[0]?._id || null
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [shouldSelectNewest, setShouldSelectNewest] = useState(false)

  // Actualizar cuando cambie el chapter
  useEffect(() => {
    if (chapter) {
      setChapterTitle(chapter.name || 'Capítulo sin título')

      // Si debemos seleccionar la más reciente (después de generar nueva versión)
      if (shouldSelectNewest && chapter.versions && chapter.versions.length > 0) {
        const newestVersion = chapter.versions[chapter.versions.length - 1]
        setActiveVersionId(newestVersion._id)
        setShouldSelectNewest(false)
      } else if (!activeVersionId) {
        // Solo actualizar si no hay versión activa seleccionada
        const newActiveId = chapter.favoriteVersion?._id || chapter.versions?.[0]?._id || null
        if (newActiveId) {
          setActiveVersionId(newActiveId)
        }
      }
    }
  }, [chapter, shouldSelectNewest])

  const activeVersion = versions.find(v => v._id === activeVersionId)

  const handleBack = () => {
    Router.push(`/cursos/${courseId}`)
  }

  const handleGenerateVersion = async () => {
    if (!chapter?._id) {
      message.error('No se pudo identificar el capítulo')
      return
    }

    setIsGenerating(true)
    message.loading('Generando contenido con IA, esto puede tardar algunos minutos...', 0)

    try {
      // Crear nueva versión con OpenAI (el prompt se genera automáticamente en el backend)
      await createVersion({
        chapter: chapter._id,
        course: courseId,
        lesson: chapter.lesson,
        name: `Versión ${versions.length + 1}`
      })

      message.destroy()
      message.success('¡Versión generada exitosamente!')

      // Indicar que debe seleccionar la versión más reciente después de recargar
      setShouldSelectNewest(true)

      // Recargar el chapter para obtener la nueva versión
      await getChapter(chapterId)
    } catch (error) {
      console.error('Error generando versión:', error)
      message.destroy()
      message.error('Error al generar la versión. Por favor intenta nuevamente.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEditVersion = async () => {
    if (!editPrompt.trim()) {
      message.warning('Por favor ingresa las instrucciones de edición')
      return
    }

    if (!activeVersionId) {
      message.error('No hay una versión activa seleccionada')
      return
    }

    setIsEditing(true)
    message.loading('Editando contenido con IA, esto puede tardar algunos minutos...', 0)

    try {
      // Editar la versión actual con OpenAI
      await editContent(activeVersionId, {
        chapter: chapter._id,
        course: courseId,
        lesson: chapter.lesson,
        editPrompt: editPrompt
      })

      message.destroy()
      message.success('¡Contenido editado exitosamente!')

      // Recargar el chapter para obtener la versión actualizada
      await getChapter(chapterId)

      setEditPrompt('')
    } catch (error) {
      console.error('Error editando versión:', error)
      message.destroy()
      message.error('Error al editar el contenido. Por favor intenta nuevamente.')
    } finally {
      setIsEditing(false)
    }
  }

  const toggleFavorite = async (versionId) => {
    if (!chapter?._id) {
      message.error('No se pudo identificar el capítulo')
      return
    }

    try {
      // Marcar como favorita en el backend
      await setFavorite(chapter._id, versionId)

      message.success('Versión marcada como favorita')

      // Recargar el chapter para obtener la actualización
      await getChapter(chapterId)
    } catch (error) {
      console.error('Error marcando favorita:', error)
      message.error('Error al marcar como favorita')
    }
  }

  return (
    <ChapterContainer>
      <ChapterHeader>
        <BackButton onClick={handleBack}>
          <Icon type="arrow-left" />
        </BackButton>
        <ChapterTitleInput
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
          placeholder="Título del capítulo"
        />
      </ChapterHeader>

      <ContentWrapper>
        <LeftPanel>
          <GenerateSection>
            <GenerateButton
              onClick={handleGenerateVersion}
              disabled={isGenerating}
            >
              <Icon type={isGenerating ? "loading" : "thunderbolt"} />
              {isGenerating ? 'Generando...' : 'Generar'}
            </GenerateButton>
          </GenerateSection>

          <VersionList>
            {versions.map((version) => {
              const isFavorite = favoriteVersion?._id === version._id
              const formattedDate = version.createdAt
                ? new Date(version.createdAt).toLocaleString('es-PE', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : 'Sin fecha'

              return (
                <VersionItem
                  key={version._id}
                  isActive={version._id === activeVersionId}
                  onClick={() => setActiveVersionId(version._id)}
                >
                  <VersionInfo>
                    <VersionNumber>Versión {version.versionNumber}</VersionNumber>
                    <VersionDate>{formattedDate}</VersionDate>
                  </VersionInfo>
                  <FavoriteIcon
                    isFavorite={isFavorite}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(version._id)
                    }}
                  >
                    <Icon type={isFavorite ? "star" : "star"} theme={isFavorite ? "filled" : "outlined"} />
                  </FavoriteIcon>
                </VersionItem>
              )
            })}
          </VersionList>
        </LeftPanel>

        <RightPanel>
          {activeVersion && (
            <>
              {/* <PromptDisplay>
                <PromptLabel>Prompt considerado:</PromptLabel>
                {activeVersion.prompt}
              </PromptDisplay> */}
              <ContentText>
                <ReactMarkdown>{activeVersion.content}</ReactMarkdown>
              </ContentText>

              {/* Historial de ediciones */}
              {activeVersion.edits && activeVersion.edits.length > 0 && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                  <PromptLabel>Historial de ediciones:</PromptLabel>
                  {activeVersion.edits.map((edit, index) => (
                    <div key={index} style={{ marginTop: '10px', padding: '10px', background: 'white', borderRadius: '4px' }}>
                      <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>
                        {new Date(edit.timestamp).toLocaleString('es-PE')}
                      </div>
                      <div style={{ fontSize: '14px' }}>{edit.editPrompt}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Sección de edición */}
              <GenerateSection style={{ marginTop: '20px' }}>
                <PromptInput
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="Escribe las instrucciones para editar esta versión..."
                  disabled={isEditing}
                  style={{ marginBottom: '10px' }}
                />
                <GenerateButton
                  onClick={handleEditVersion}
                  disabled={isEditing || !editPrompt.trim()}
                >
                  <Icon type={isEditing ? "loading" : "edit"} />
                  {isEditing ? 'Editando...' : 'Editar Contenido'}
                </GenerateButton>
              </GenerateSection>
            </>
          )}
        </RightPanel>
      </ContentWrapper>
    </ChapterContainer>
  )
}
