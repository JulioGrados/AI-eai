import Head from 'next/head'
import { Base, Private } from 'layouts-path'
import { Dashboard } from '../views/home/components/Dashboard'

const Home = () => {
  return (
    <Base current='home' currentMenu='home'>
      <Head>
        <title>Inicio - Cursos IA</title>
      </Head>
      <Dashboard />
    </Base>
  )
}

export default Private(Home)
