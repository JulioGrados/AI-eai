import { Base, Private } from 'layouts-path'
import { useRouter } from 'next/router'
import { CourseDetailContainer } from 'views-path/course/containers/CourseDetailContainer'
import Head from 'next/head'

const CourseDetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Base current='cursos-todos' currentMenu='cursos'>
      <Head>
        <title>Detalle del Curso - Cursos IA</title>
      </Head>
      <CourseDetailContainer courseId={id} />
    </Base>
  )
}

export default Private(CourseDetailPage)
