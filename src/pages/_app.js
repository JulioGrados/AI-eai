import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../redux'
import Head from 'next/head'

import { GlobalStyle } from '../styles/GlobalStyle'

import { getCookie } from 'utils/functions/session'

import 'antd/dist/antd.min.css'

const MyApp = ({ Component, pageProps, store }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>Cursos IA - EAI</title>
        <link rel='shortcut icon' href='/static/img/favicon.png' />
      </Head>
      <Component {...pageProps} />
      <GlobalStyle />
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
    ctx.currentUser = JSON.parse(decodeURI(currentUser).replace(/\%2C/g, ','))
  }
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {}
  return { pageProps }
}

export default withRedux(initStore)(MyApp)
