import { Base, Private } from 'layouts-path'
import { CreateCourse } from 'views-path/course/containers/CreateCourse'
import Head from 'next/head'

const CreateCoursePage = () => {
  return (
    <Base current='cursos-crear' currentMenu='cursos'>
      <Head>
        <title>Crear Curso - Cursos IA</title>
      </Head>
      <CreateCourse />
    </Base>
  )
}

export default Private(CreateCoursePage)
