import React from 'react'
import { useRouter } from 'next/router'
import { Base } from 'layouts-path'
import { Private } from '../../../../layouts/private'
import { EvaluationContainer } from '../../../../views/course/containers/EvaluationContainer'

// Mock data - esto será reemplazado con llamadas a la API
const mockModules = {
  '691904a0d8d7a': {
    id: '691904a0d8d7a',
    title: 'Evaluación del Módulo: Introducción',
    courseId: '6918f824d8d7acfdc32b2eff',
    order: 1,
    evaluationVersions: [
      {
        id: 'v1',
        versionNumber: 1,
        prompt: 'Genera 10 preguntas de opción múltiple sobre los conceptos básicos del marketing digital',
        createdAt: '2024-03-15 10:30',
        isFavorite: true,
        questions: [
          {
            id: 'q1',
            question: '¿Qué es el marketing digital?',
            options: [
              { id: 'a', text: 'Estrategias de promoción en internet', isCorrect: true },
              { id: 'b', text: 'Publicidad en televisión', isCorrect: false },
              { id: 'c', text: 'Venta directa de productos', isCorrect: false },
              { id: 'd', text: 'Marketing tradicional', isCorrect: false }
            ]
          },
          {
            id: 'q2',
            question: '¿Cuál de las siguientes NO es una estrategia de marketing digital?',
            options: [
              { id: 'a', text: 'SEO', isCorrect: false },
              { id: 'b', text: 'Email marketing', isCorrect: false },
              { id: 'c', text: 'Anuncios en periódicos', isCorrect: true },
              { id: 'd', text: 'Redes sociales', isCorrect: false }
            ]
          },
          {
            id: 'q3',
            question: '¿Qué significa SEO?',
            options: [
              { id: 'a', text: 'Social Engine Optimization', isCorrect: false },
              { id: 'b', text: 'Search Engine Optimization', isCorrect: true },
              { id: 'c', text: 'Secure Engine Operation', isCorrect: false },
              { id: 'd', text: 'Simple Email Outreach', isCorrect: false }
            ]
          },
          {
            id: 'q4',
            question: '¿Cuál es la principal ventaja del marketing digital sobre el tradicional?',
            options: [
              { id: 'a', text: 'Es más costoso', isCorrect: false },
              { id: 'b', text: 'Permite medición en tiempo real', isCorrect: true },
              { id: 'c', text: 'Requiere más personal', isCorrect: false },
              { id: 'd', text: 'Es menos efectivo', isCorrect: false }
            ]
          },
          {
            id: 'q5',
            question: '¿Qué es el SEM?',
            options: [
              { id: 'a', text: 'Social Email Marketing', isCorrect: false },
              { id: 'b', text: 'Search Engine Marketing', isCorrect: true },
              { id: 'c', text: 'Secure Email Method', isCorrect: false },
              { id: 'd', text: 'Simple Event Management', isCorrect: false }
            ]
          },
          {
            id: 'q6',
            question: '¿Cuál es el objetivo principal del marketing de contenidos?',
            options: [
              { id: 'a', text: 'Vender productos directamente', isCorrect: false },
              { id: 'b', text: 'Atraer y retener audiencia con contenido valioso', isCorrect: true },
              { id: 'c', text: 'Enviar spam masivo', isCorrect: false },
              { id: 'd', text: 'Comprar anuncios en TV', isCorrect: false }
            ]
          },
          {
            id: 'q7',
            question: '¿Qué plataforma NO es considerada una red social?',
            options: [
              { id: 'a', text: 'Facebook', isCorrect: false },
              { id: 'b', text: 'Instagram', isCorrect: false },
              { id: 'c', text: 'Google Analytics', isCorrect: true },
              { id: 'd', text: 'LinkedIn', isCorrect: false }
            ]
          },
          {
            id: 'q8',
            question: '¿Qué es el email marketing?',
            options: [
              { id: 'a', text: 'Envío de correos personales', isCorrect: false },
              { id: 'b', text: 'Estrategia de comunicación por correo electrónico', isCorrect: true },
              { id: 'c', text: 'Spam masivo', isCorrect: false },
              { id: 'd', text: 'Mensajes de texto', isCorrect: false }
            ]
          },
          {
            id: 'q9',
            question: '¿Cuál es una métrica importante en marketing digital?',
            options: [
              { id: 'a', text: 'Número de empleados', isCorrect: false },
              { id: 'b', text: 'Tasa de conversión', isCorrect: true },
              { id: 'c', text: 'Color del logo', isCorrect: false },
              { id: 'd', text: 'Ubicación de la oficina', isCorrect: false }
            ]
          },
          {
            id: 'q10',
            question: '¿Qué es el CTR (Click Through Rate)?',
            options: [
              { id: 'a', text: 'Costo total de la campaña', isCorrect: false },
              { id: 'b', text: 'Porcentaje de clics sobre impresiones', isCorrect: true },
              { id: 'c', text: 'Número de conversiones', isCorrect: false },
              { id: 'd', text: 'Tiempo en la página', isCorrect: false }
            ]
          }
        ]
      }
    ]
  },
  '691904a1d8d7a': {
    id: '691904a1d8d7a',
    title: 'Evaluación del Módulo: Fundamentos',
    courseId: '6918f824d8d7acfdc32b2eff',
    order: 2,
    evaluationVersions: []
  }
}

const EvaluationPage = () => {
  const router = useRouter()
  const { id: courseId, moduleId } = router.query

  // En producción, aquí se haría un fetch a la API
  const module = mockModules[moduleId] || {
    id: moduleId,
    title: 'Evaluación del Módulo',
    evaluationVersions: []
  }

  return (
    <Base current='cursos-todos' currentMenu='cursos'>
      <EvaluationContainer
        courseId={courseId}
        moduleId={moduleId}
        module={module}
      />
    </Base>
  )
}

export default Private(EvaluationPage)
