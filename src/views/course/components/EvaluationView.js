import React, { useState, useEffect } from 'react'
import { Icon, message } from 'antd'
import Router from 'next/router'

import { useEvaluations, useEvaluationVersions } from '../../../hooks'
import {
  PageHead,
  InlineTitleInput,
  SectionTitle,
  PrimaryButton,
  GhostButton,
  Chip,
  OrderBadge,
  EmptyState,
  LoadingState
} from '../../../components/ui'
import {
  EvaluationContainer,
  ContentWrapper,
  LeftPanel,
  VersionList,
  VersionItem,
  VersionInfo,
  VersionNumber,
  VersionDate,
  FavoriteIcon,
  RightPanel,
  QuestionsList,
  QuestionCard,
  QuestionHeader,
  QuestionText,
  OptionsList,
  OptionItem,
  OptionLabel,
  OptionText,
  CorrectBadge,
  ContentText,
  ComposerCard,
  ComposerHeader,
  PromptInput,
  ComposerActions,
  HistoryList,
  HistoryItem,
  HistoryDate,
  HistoryText
} from '../styles/evaluation.styd'

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

/* Las opciones llegan planas (una fila por alternativa); aquí se agrupan por pregunta */
const groupByQuestion = (options = []) => {
  const grouped = []

  options.forEach(option => {
    let entry = grouped.find(item => item.question === option.question)
    if (!entry) {
      entry = { question: option.question, options: [] }
      grouped.push(entry)
    }
    entry.options.push({
      id: option.id,
      text: option.text,
      isCorrect: option.isCorrect
    })
  })

  return grouped
}

export const EvaluationView = ({ courseId, moduleId, exam, loading: examLoading }) => {
  const { get: getExam, create: createExam, update: updateExam } = useEvaluations()
  const { create: createVersion, setFavorite, editContent } = useEvaluationVersions()

  const [moduleTitle, setModuleTitle] = useState('')
  const [editPrompt, setEditPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [shouldSelectNewest, setShouldSelectNewest] = useState(false)
  const [isCreatingExam, setIsCreatingExam] = useState(false)

  const versions = exam?.versions || []
  const favoriteVersion = exam?.favoriteVersion
  const [activeVersionId, setActiveVersionId] = useState(
    favoriteVersion?._id || versions[0]?._id || null
  )

  // Actualizar título y versión activa cuando cambia el exam
  useEffect(() => {
    if (exam) {
      setModuleTitle(exam.name || 'Evaluación del Módulo')

      if (shouldSelectNewest && exam.versions && exam.versions.length > 0) {
        const newestVersion = exam.versions[exam.versions.length - 1]
        setActiveVersionId(newestVersion._id)
        setShouldSelectNewest(false)
      } else if (!activeVersionId) {
        const newActiveId = exam.favoriteVersion?._id || exam.versions?.[0]?._id || null
        if (newActiveId) {
          setActiveVersionId(newActiveId)
        }
      }
    }
  }, [exam, shouldSelectNewest])

  const activeVersion = versions.find(v => v._id === activeVersionId)
  const questions = activeVersion ? groupByQuestion(activeVersion.options) : []

  const handleBack = () => {
    Router.push(`/cursos/${courseId}`)
  }

  // El título se guarda al salir del campo, solo si realmente cambió
  const handleTitleBlur = async () => {
    const name = moduleTitle.trim()
    if (!exam?._id || !name || name === exam.name) return

    try {
      await updateExam(exam._id, { name })
      message.success('Título actualizado')
    } catch (error) {
      console.error('Error actualizando título:', error)
      message.error('No se pudo actualizar el título')
      setModuleTitle(exam.name || '')
    }
  }

  // Generar nueva versión SIN prompt manual (auto-generado)
  const handleGenerateVersion = async () => {
    if (!moduleId) {
      message.error('No se pudo identificar el módulo')
      return
    }

    let currentExam = exam
    let currentVersionsLength = versions.length

    try {
      // Si no existe el exam, crearlo primero (solo una vez)
      if (!currentExam) {
        setIsCreatingExam(true)
        message.loading('Preparando evaluación...', 0)

        const newExamData = {
          lesson: moduleId,
          name: 'Evaluación del Módulo',
          versions: []
        }

        const createdExam = await createExam(newExamData)
        message.destroy()

        // El dispatch de Redux devuelve el payload directamente
        currentExam = createdExam
        currentVersionsLength = 0
        setIsCreatingExam(false)
      }

      // Generar nueva versión (siempre, tenga o no tenga versiones previas)
      setIsGenerating(true)
      message.loading('Generando evaluación con IA, esto puede tardar algunos minutos...', 0)

      const versionData = {
        exam: currentExam._id,
        course: courseId,
        lesson: moduleId,
        name: `Versión ${currentVersionsLength + 1}`
      }

      await createVersion(versionData)

      message.destroy()
      message.success('¡Evaluación generada exitosamente!')
      setShouldSelectNewest(true)

      // Recargar el exam para obtener las versiones actualizadas
      await getExam(currentExam._id)
    } catch (error) {
      console.error('Error completo:', error)
      message.destroy()
      message.error('Error al generar la evaluación. Por favor intenta nuevamente.')
    } finally {
      setIsGenerating(false)
      setIsCreatingExam(false)
    }
  }

  // Editar versión existente
  const handleEditVersion = async () => {
    if (!editPrompt.trim()) {
      message.warning('Por favor ingresa las instrucciones de edición')
      return
    }

    if (!activeVersionId) {
      message.error('No hay versión seleccionada')
      return
    }

    setIsEditing(true)
    message.loading('Editando evaluación con IA, esto puede tardar algunos minutos...', 0)

    try {
      await editContent(activeVersionId, { editPrompt: editPrompt })
      message.destroy()
      message.success('¡Evaluación editada exitosamente!')
      await getExam(exam._id)
      setEditPrompt('')
    } catch (error) {
      console.error('Error al editar evaluación:', error)
      message.destroy()
      message.error('Error al editar la evaluación. Por favor intenta nuevamente.')
    } finally {
      setIsEditing(false)
    }
  }

  // Cambiar versión favorita
  const toggleFavorite = async (versionId) => {
    if (!exam) return

    try {
      await setFavorite(exam._id, versionId)
      await getExam(exam._id)
      message.success('Versión favorita actualizada')
    } catch (error) {
      console.error('Error al marcar favorita:', error)
      message.error('Error al actualizar versión favorita')
    }
  }

  if (examLoading) {
    return (
      <EvaluationContainer>
        <LoadingState text='Cargando evaluación...' />
      </EvaluationContainer>
    )
  }

  const isBusy = isGenerating || isCreatingExam

  const generateButton = (
    <PrimaryButton onClick={handleGenerateVersion} disabled={isBusy}>
      <Icon type={isBusy ? 'loading' : 'thunderbolt'} />
      {isGenerating ? 'Generando...' : isCreatingExam ? 'Creando...' : 'Generar versión'}
    </PrimaryButton>
  )

  return (
    <EvaluationContainer>
      <PageHead
        onBack={handleBack}
        subtitle={
          questions.length
            ? `${questions.length} ${questions.length === 1 ? 'pregunta' : 'preguntas'} · ${versions.length} ${versions.length === 1 ? 'versión' : 'versiones'}`
            : 'Genera la evaluación del módulo con IA'
        }
        actions={generateButton}
      >
        <InlineTitleInput
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
          onBlur={handleTitleBlur}
          placeholder='Título de la evaluación'
        />
      </PageHead>

      <ContentWrapper>
        <LeftPanel>
          <SectionTitle style={{ margin: 0 }}>Versiones</SectionTitle>

          {versions.length === 0 ? (
            <VersionDate>Todavía no hay versiones.</VersionDate>
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
              {questions.length > 0 ? (
                <QuestionsList>
                  {questions.map((item, index) => (
                    <QuestionCard key={index}>
                      <QuestionHeader>
                        <OrderBadge>{index + 1}</OrderBadge>
                        <QuestionText>{item.question}</QuestionText>
                      </QuestionHeader>
                      <OptionsList>
                        {item.options.map((option) => (
                          <OptionItem key={option.id} $correct={option.isCorrect}>
                            <OptionLabel $correct={option.isCorrect}>
                              {(option.id || '').toString().toUpperCase()}
                            </OptionLabel>
                            <OptionText>{option.text}</OptionText>
                            {option.isCorrect && <CorrectBadge>Correcta</CorrectBadge>}
                          </OptionItem>
                        ))}
                      </OptionsList>
                    </QuestionCard>
                  ))}
                </QuestionsList>
              ) : (
                <ContentText>{activeVersion.content || 'Sin contenido generado'}</ContentText>
              )}

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
                  placeholder='Por ejem. "Haz las preguntas más aplicadas y agrega dos casos prácticos".'
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
            <QuestionCard>
              <EmptyState
                icon='file-text'
                title={versions.length === 0 ? 'Sin evaluación todavía' : 'Selecciona una versión'}
                text={
                  versions.length === 0
                    ? 'Genera la primera versión y la IA creará las preguntas a partir del contenido del módulo.'
                    : 'Elige una versión de la izquierda para ver sus preguntas.'
                }
                action={versions.length === 0 ? generateButton : null}
              />
            </QuestionCard>
          )}
        </RightPanel>
      </ContentWrapper>
    </EvaluationContainer>
  )
}
