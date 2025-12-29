import { Base, Private } from 'layouts-path'
import Head from 'next/head'

const Home = () => {
  return (
    <Base current='home' currentMenu='home'>
      <Head>
        <title>Dashboard - Cursos IA</title>
      </Head>
      <div style={{ background: 'white', padding: '40px', borderRadius: '4px', textAlign: 'center' }}>
        <h1>Bienvenido a Cursos IA - EAI</h1>
        <p>Sistema de generación de cursos con Inteligencia Artificial</p>
      </div>
    </Base>
  )
}

export default Private(Home)
