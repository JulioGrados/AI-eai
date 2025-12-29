import { Base, Private } from 'layouts-path'
import Head from 'next/head'
import { CourseListContainer } from '../../views/course/containers/CourseListContainer'

const CursosPage = () => {
  return (
    <Base current='cursos-todos' currentMenu='cursos'>
      <Head>
        <title>Todos los Cursos - Cursos IA</title>
      </Head>
      <CourseListContainer />
    </Base>
  )
}

export default Private(CursosPage)
