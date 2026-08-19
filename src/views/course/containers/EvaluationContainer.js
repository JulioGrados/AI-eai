import { useEffect } from 'react'
import { EvaluationView } from '../components/EvaluationView'
import { useEvaluations } from '../../../hooks'

// `lesson` llega como id plano, pero se compara contra `_id` por si algún
// día el backend lo popula
const lessonIdOf = (exam) => {
  const lesson = exam && exam.lesson
  if (!lesson) return null
  return (lesson._id || lesson).toString()
}

export const EvaluationContainer = ({ courseId, moduleId }) => {
  const { evaluations, loading, ready, current, get } = useEvaluations({ module: moduleId })

  // El store de evaluaciones es uno solo para toda la app, así que hay que
  // quedarse únicamente con lo que pertenece a ESTE módulo. Sin este filtro,
  // al abrir el segundo módulo seguía mostrándose la evaluación del primero
  // y "Generar" agregaba versiones al examen equivocado
  const listedExam = evaluations.find(item => lessonIdOf(item) === moduleId) || null
  const detailedExam = current && lessonIdOf(current) === moduleId ? current : null

  const listedExamId = listedExam && listedExam._id

  // Cargar el detalle (trae las versiones pobladas) del examen del módulo
  useEffect(() => {
    if (listedExamId && (!detailedExam || detailedExam._id !== listedExamId)) {
      get(listedExamId)
    }
  }, [listedExamId])

  // Usar el detalle si existe (tiene las versiones pobladas), sino el del listado
  const exam = detailedExam || listedExam

  return (
    <EvaluationView
      key={moduleId}
      courseId={courseId}
      moduleId={moduleId}
      exam={exam}
      loading={loading || !ready || !moduleId}
    />
  )
}
