import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Base } from 'layouts-path'
import { Private } from '../../../../layouts/private'
import { ChapterContainer } from '../../../../views/course/containers/ChapterContainer'

const ChapterPage = () => {
  const router = useRouter()
  const { id: courseId, chapterId } = router.query

  // Estructura mínima mientras el capítulo real se carga desde la API
  const fallbackChapter = {
    _id: chapterId,
    name: '',
    versions: []
  }

  return (
    <Base current='cursos-todos' currentMenu='cursos' title='Capítulo'>
      <Head>
        <title>Capítulo - Cursos IA</title>
      </Head>
      <ChapterContainer
        courseId={courseId}
        chapterId={chapterId}
        chapter={fallbackChapter}
      />
    </Base>
  )
}

export default Private(ChapterPage)
