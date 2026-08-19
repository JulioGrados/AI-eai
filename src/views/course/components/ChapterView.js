import React, { useState, useEffect } from 'react'
import { Icon, message } from 'antd'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'

import { useChapterVersions, useChapters } from '../../../hooks'
import {
  PageHead,
  InlineTitleInput,
  SectionTitle,
  PrimaryButton,
  GhostButton,
  Chip,
  EmptyState
} from '../../../components/ui'
import {
  ChapterContainer,
  ContentWrapper,
  LeftPanel,
  VersionList,
  VersionItem,
  VersionInfo,
  VersionNumber,
  VersionDate,
  FavoriteIcon,
  RightPanel,
  ReaderCard,
  ComposerCard,
  ComposerHeader,
  PromptInput,
  ComposerActions,
  HistoryList,
  HistoryItem,
  HistoryDate,
  HistoryText,
  ContentText
} from '../styles/chapter.styd'

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
    : 'Sin fecha'

export const ChapterView = ({ courseId, chapterId, chapter, loading }) => {
  const { create: createVersion, setFavorite, editContent } = useChapterVersions()
  const { get: getChapter, update: updateChapter } = useChapters()
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

  // El título se guarda al salir del campo, solo si realmente cambió
  const handleTitleBlur = async () => {
    const name = chapterTitle.trim()
    if (!chapter?._id || !name || name === chapter.name) return

    try {
      await updateChapter(chapter._id, { name })
      message.success('Título actualizado')
    } catch (error) {
      console.error('Error actualizando título:', error)
      message.error('No se pudo actualizar el título')
      setChapterTitle(chapter.name || '')
    }
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

  // Mientras carga no se conoce el capítulo real: generar ahí crearía la
  // versión sobre datos incompletos
  const generateButton = (
    <PrimaryButton onClick={handleGenerateVersion} disabled={isGenerating || loading}>
      <Icon type={isGenerating ? 'loading' : 'thunderbolt'} />
      {isGenerating ? 'Generando...' : 'Generar versión'}
    </PrimaryButton>
  )

  return (
    <ChapterContainer>
      <PageHead
        onBack={handleBack}
        subtitle={`${versions.length} ${versions.length === 1 ? 'versión generada' : 'versiones generadas'}`}
        actions={generateButton}
      >
        <InlineTitleInput
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
          onBlur={handleTitleBlur}
          placeholder='Título del capítulo'
        />
      </PageHead>

      <ContentWrapper>
        <LeftPanel>
          <SectionTitle style={{ margin: 0 }}>Versiones</SectionTitle>

          {versions.length === 0 ? (
            <VersionDate>
              {loading ? 'Cargando versiones...' : 'Todavía no hay versiones.'}
            </VersionDate>
          ) : (
            <VersionList>
              {versions.map((version) => {
                const isFavorite = favoriteVersion?._id === version._id
                const isActive = version._id === activeVersionId

                return (
                  <VersionItem
                    key={version._id}
                    $active={isActive}
                    onClick={() => setActiveVersionId(version._id)}
                  >
                    <VersionInfo>
                      <VersionNumber $active={isActive}>
                        Versión {version.versionNumber}
                      </VersionNumber>
                      <VersionDate>{formatDate(version.createdAt)}</VersionDate>
                    </VersionInfo>
                    <FavoriteIcon
                      $favorite={isFavorite}
                      title={isFavorite ? 'Versión favorita' : 'Marcar como favorita'}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(version._id)
                      }}
                    >
                      <Icon type='star' theme={isFavorite ? 'filled' : 'outlined'} />
                    </FavoriteIcon>
                  </VersionItem>
                )
              })}
            </VersionList>
          )}
        </LeftPanel>

        <RightPanel>
          {activeVersion ? (
            <>
              <ReaderCard>
                <ContentText>
                  <ReactMarkdown>{activeVersion.content}</ReactMarkdown>
                </ContentText>
              </ReaderCard>

              {activeVersion.edits && activeVersion.edits.length > 0 && (
                <ComposerCard>
                  <ComposerHeader>
                    <Icon type='history' />
                    Historial de ediciones
                    <Chip>{activeVersion.edits.length}</Chip>
                  </ComposerHeader>
                  <HistoryList>
                    {activeVersion.edits.map((edit, index) => (
                      <HistoryItem key={index}>
                        <HistoryDate>{formatDate(edit.timestamp)}</HistoryDate>
                        <HistoryText>{edit.editPrompt}</HistoryText>
                      </HistoryItem>
                    ))}
                  </HistoryList>
                </ComposerCard>
              )}

              <ComposerCard>
                <ComposerHeader>
                  <Icon type='edit' />
                  Editar con IA
                </ComposerHeader>
                <PromptInput
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder='Por ejem. "Agrega un ejemplo práctico al final y simplifica la introducción".'
                  disabled={isEditing}
                />
                <ComposerActions>
                  <GhostButton
                    onClick={handleEditVersion}
                    disabled={isEditing || !editPrompt.trim()}
                  >
                    <Icon type={isEditing ? 'loading' : 'edit'} />
                    {isEditing ? 'Editando...' : 'Aplicar cambios'}
                  </GhostButton>
                </ComposerActions>
              </ComposerCard>
            </>
          ) : (
            <ReaderCard>
              <EmptyState
                icon='thunderbolt'
                title={versions.length === 0 ? 'Sin contenido todavía' : 'Selecciona una versión'}
                text={
                  versions.length === 0
                    ? 'Genera la primera versión del capítulo y aparecerá aquí para revisarla y editarla.'
                    : 'Elige una versión de la izquierda para ver su contenido.'
                }
                action={versions.length === 0 ? generateButton : null}
              />
            </ReaderCard>
          )}
        </RightPanel>
      </ContentWrapper>
    </ChapterContainer>
  )
}
