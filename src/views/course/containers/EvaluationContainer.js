import { useEffect } from 'react'
import { EvaluationView } from '../components/EvaluationView'
import { useEvaluations } from '../../../hooks'

export const EvaluationContainer = ({ courseId, moduleId }) => {
  const { evaluations, loading, current, get } = useEvaluations({ module: moduleId })

  const currentExam = evaluations[0] || null

  // Cargar el detalle del exam cuando se encuentra uno en el listado
  useEffect(() => {
    if (currentExam && currentExam._id) {
      get(currentExam._id)
    }
  }, [currentExam?._id])

  // Usar current si existe (tiene las versiones pobladas), sino usar currentExam
  const exam = current || currentExam

  return (
    <EvaluationView
      courseId={courseId}
      moduleId={moduleId}
      exam={exam}
      loading={loading}
    />
  )
}
