import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Base } from 'layouts-path'
import { Private } from '../../../../layouts/private'
import { EvaluationContainer } from '../../../../views/course/containers/EvaluationContainer'

const EvaluationPage = () => {
  const router = useRouter()
  const { id: courseId, moduleId } = router.query

  return (
    <Base current='cursos-todos' currentMenu='cursos' title='Evaluación'>
      <Head>
        <title>Evaluación - Cursos IA</title>
      </Head>
      <EvaluationContainer courseId={courseId} moduleId={moduleId} />
    </Base>
  )
}

export default Private(EvaluationPage)
