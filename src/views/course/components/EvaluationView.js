import React, { useState, useEffect } from 'react'
import { Icon, message } from 'antd'
import Router from 'next/router'
import { useEvaluations, useEvaluationVersions } from '../../../hooks'
import {
  EvaluationContainer,
  EvaluationHeader,
  BackButton,
  ModuleTitleInput,
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
  PromptDisplay,
  PromptLabel,
  ContentText,
  QuestionsList,
  QuestionCard,
  QuestionHeader,
  QuestionNumber,
  QuestionText,
  OptionsList,
  OptionItem,
  OptionLabel,
  OptionText,
  OptionInput,
  QuestionInput,
  SaveButton,
  CorrectBadge
} from '../styles/evaluation.styd'

export const EvaluationView = ({ courseId, moduleId, exam, loading: examLoading }) => {
  const { get: getExam, create: createExam } = useEvaluations()
  const { create: createVersion, setFavorite, editContent, update: updateVersion } = useEvaluationVersions()

  const [moduleTitle, setModuleTitle] = useState('')
  const [editPrompt, setEditPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [shouldSelectNewest, setShouldSelectNewest] = useState(false)
  const [isCreatingExam, setIsCreatingExam] = useState(false)
  const [editableQuestions, setEditableQuestions] = useState({})
  const [isSaving, setIsSaving] = useState(false)

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

  // Inicializar preguntas editables cuando cambia la versión activa
  useEffect(() => {
    if (activeVersion && activeVersion.options) {
      const questionsData = {}
      activeVersion.options.forEach(option => {
        if (!questionsData[option.question]) {
          questionsData[option.question] = {
            question: option.question,
            options: []
          }
        }
        questionsData[option.question].options.push({
          id: option.id,
          text: option.text,
          isCorrect: option.isCorrect
        })
      })
      setEditableQuestions(questionsData)
    }
  }, [activeVersion])

  // Manejar cambio en el texto de la pregunta
  const handleQuestionChange = (oldQuestion, newQuestion) => {
    setEditableQuestions(prev => {
      const updated = { ...prev }
      if (updated[oldQuestion]) {
        updated[newQuestion] = { ...updated[oldQuestion], question: newQuestion }
        if (oldQuestion !== newQuestion) {
          delete updated[oldQuestion]
        }
      }
      return updated
    })
  }

  // Manejar cambio en el texto de una opción
  const handleOptionTextChange = (question, optionId, newText) => {
    setEditableQuestions(prev => {
      const updated = { ...prev }
      if (updated[question]) {
        updated[question].options = updated[question].options.map(opt =>
          opt.id === optionId ? { ...opt, text: newText } : opt
        )
      }
      return updated
    })
  }

  // Manejar cambio de respuesta correcta
  const handleCorrectChange = (question, optionId) => {
    setEditableQuestions(prev => {
      const updated = { ...prev }
      if (updated[question]) {
        updated[question].options = updated[question].options.map(opt => ({
          ...opt,
          isCorrect: opt.id === optionId
        }))
      }
      return updated
    })
  }

  // Guardar cambios en la versión
  const handleSaveChanges = async () => {
    if (!activeVersionId) return

    setIsSaving(true)
    message.loading('Guardando cambios...', 0)

    try {
      // Convertir questionsData de vuelta a array de opciones
      const updatedOptions = []
      Object.values(editableQuestions).forEach(({ question, options }) => {
        options.forEach(option => {
          updatedOptions.push({
            question,
            id: option.id,
            text: option.text,
            isCorrect: option.isCorrect
          })
        })
      })

      await updateVersion(activeVersionId, { options: updatedOptions })

      message.destroy()
      message.success('Cambios guardados exitosamente')

      // Recargar el exam
      if (exam._id) {
        await getExam(exam._id)
      }
    } catch (error) {
      console.error('Error al guardar cambios:', error)
      message.destroy()
      message.error('Error al guardar los cambios')
    } finally {
      setIsSaving(false)
    }
  }

  const handleBack = () => {
    Router.push(`/cursos/${courseId}`)
  }

  // Generar nueva versión SIN prompt manual (auto-generado)
  const handleGenerateVersion = async () => {
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

        console.log('Exam creado:', currentExam)
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

      console.log('Creando versión con data:', versionData)
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
      await editContent(activeVersionId, {editPrompt: editPrompt})
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
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Icon type="loading" style={{ fontSize: '32px' }} />
          <div style={{ marginTop: '16px' }}>Cargando evaluación...</div>
        </div>
      </EvaluationContainer>
    )
  }

  return (
    <EvaluationContainer>
      <EvaluationHeader>
        <BackButton onClick={handleBack}>
          <Icon type="arrow-left" />
        </BackButton>
        <ModuleTitleInput
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
          placeholder="Título de la evaluación"
        />
      </EvaluationHeader>

      <ContentWrapper>
        <LeftPanel>
          <GenerateSection>
            <GenerateButton
              onClick={handleGenerateVersion}
              disabled={isGenerating || isCreatingExam}
            >
              <Icon type={isGenerating || isCreatingExam ? "loading" : "thunderbolt"} />
              {isGenerating ? 'Generando...' : isCreatingExam ? 'Creando...' : 'Generar'}
            </GenerateButton>
          </GenerateSection>

          <VersionList>
            {versions.map((version) => {
              const isFavorite = favoriteVersion?._id === version._id
              return (
                <VersionItem
                  key={version._id}
                  isActive={version._id === activeVersionId}
                  onClick={() => setActiveVersionId(version._id)}
                >
                  <VersionInfo>
                    <VersionNumber>Versión {version.versionNumber}</VersionNumber>
                    <VersionDate>
                      {new Date(version.createdAt).toLocaleString('es-PE', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </VersionDate>
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
          {activeVersion ? (
            <>
              {/* <PromptDisplay>
                <PromptLabel>Prompt generado automáticamente:</PromptLabel>
                {activeVersion.prompt}
              </PromptDisplay> */}

              {Object.keys(editableQuestions).length > 0 ? (
                <QuestionsList>
                  {Object.entries(editableQuestions).map(([question, data], index) => (
                    <QuestionCard key={index}>
                      <QuestionHeader>
                        <QuestionNumber>{index + 1}</QuestionNumber>
                        <QuestionText>{data.question}</QuestionText>
                      </QuestionHeader>
                      <OptionsList>
                        {data.options.map((option) => (
                          <OptionItem
                            key={option.id}
                            isCorrect={option.isCorrect}
                          >
                            <OptionLabel isCorrect={option.isCorrect}>
                              {option.id.toUpperCase()}
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
                <ContentText>{activeVersion?.content || 'Sin contenido generado'}</ContentText>
              )}

              {activeVersion.edits && activeVersion.edits.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <PromptLabel>Historial de ediciones:</PromptLabel>
                  {activeVersion.edits.map((edit, index) => (
                    <div key={index} style={{
                      padding: '12px',
                      background: '#f5f5f5',
                      borderRadius: '4px',
                      marginTop: '8px'
                    }}>
                      <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                        {new Date(edit.timestamp).toLocaleString('es-PE')}
                      </div>
                      <div>{edit.editPrompt}</div>
                    </div>
                  ))}
                </div>
              )}

              <GenerateSection style={{ marginTop: '24px' }}>
                <PromptInput
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="Escribe las instrucciones para editar esta evaluación..."
                  disabled={isEditing}
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
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
              {versions.length === 0
                ? 'Haz clic en "Generar" para crear la primera versión de la evaluación'
                : 'Selecciona una versión para ver su contenido'}
            </div>
          )}
        </RightPanel>
      </ContentWrapper>
    </EvaluationContainer>
  )
}
