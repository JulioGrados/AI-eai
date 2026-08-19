import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'

import { initStore } from '../redux'
import { GlobalStyle } from '../styles/GlobalStyle'

import { getCookie } from 'utils/functions/session'

import 'antd/dist/antd.min.css'

const MyApp = ({ Component, pageProps, store }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>Cursos IA - EAI</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='Generador de cursos con inteligencia artificial de la Escuela Americana de Innovación.'
        />
        {/* El .png original es de 16x16 y se ve borroso: el SVG escala nítido
            y el png queda solo como respaldo para navegadores antiguos */}
        <link rel='icon' type='image/svg+xml' href='/static/img/eai_isotipo.svg' />
        <link rel='alternate icon' href='/static/img/favicon.png' />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const jwt = getCookie('jwt', ctx.req)
  const currentUser = getCookie('user', ctx.req)

  if (jwt) {
    ctx.jwt = jwt
  }
  if (currentUser) {
    ctx.currentUser = JSON.parse(decodeURI(currentUser).replace(/%2C/g, ','))
  }
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {}
  return { pageProps }
}

export default withRedux(initStore)(MyApp)
