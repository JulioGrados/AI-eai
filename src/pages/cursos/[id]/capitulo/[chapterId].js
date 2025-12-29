import React from 'react'
import { useRouter } from 'next/router'
import { Base } from 'layouts-path'
import { Private } from '../../../../layouts/private'
import { ChapterContainer } from '../../../../views/course/containers/ChapterContainer'

// Mock data - esto será reemplazado con llamadas a la API
const mockChapters = {
  '691904b2d8d7a': {
    id: '691904b2d8d7a',
    title: 'Introducción al Marketing Digital',
    moduleId: '691904a0d8d7a',
    courseId: '6918f824d8d7acfdc32b2eff',
    versions: [
      {
        id: 'v1',
        versionNumber: 1,
        content: 'El marketing digital es el conjunto de estrategias volcadas hacia la promoción de una marca en el internet. Se diferencia del marketing tradicional por incluir el uso de canales y métodos que permiten el análisis de los resultados en tiempo real.\n\nEntre las principales estrategias de marketing digital se encuentran:\n\n• SEO (Search Engine Optimization)\n• Marketing de contenidos\n• Email marketing\n• Redes sociales\n• Publicidad online (SEM)\n\nEl marketing digital permite a las empresas conectar con su audiencia de manera más directa y personalizada, midiendo el impacto de cada acción.',
        prompt: 'Explica qué es el marketing digital y cuáles son sus principales estrategias',
        createdAt: '2024-03-15 10:30',
        isFavorite: true
      },
      {
        id: 'v2',
        versionNumber: 2,
        content: 'El marketing digital representa la evolución natural del marketing tradicional en la era de la información. Comprende todas aquellas acciones y estrategias publicitarias o comerciales que se ejecutan en los medios y canales de internet.\n\nCaracterísticas principales:\n\n1. Medición en tiempo real\n2. Segmentación precisa del público objetivo\n3. Interacción bidireccional con los usuarios\n4. Optimización continua de campañas\n5. Mayor alcance con menor inversión\n\nLas empresas que adoptan el marketing digital pueden adaptarse rápidamente a las tendencias del mercado y las necesidades de sus clientes.',
        prompt: 'Dame una explicación más detallada sobre marketing digital incluyendo sus características',
        createdAt: '2024-03-15 11:45',
        isFavorite: false
      }
    ]
  }
}

const ChapterPage = () => {
  const router = useRouter()
  const { id: courseId, chapterId } = router.query

  // En producción, aquí se haría un fetch a la API
  const chapter = mockChapters[chapterId] || {
    id: chapterId,
    title: 'Capítulo sin título',
    versions: []
  }

  return (
    <Base current='cursos-todos' currentMenu='cursos'>
      <ChapterContainer
        courseId={courseId}
        chapterId={chapterId}
        chapter={chapter}
      />
    </Base>
  )
}

export default Private(ChapterPage)
