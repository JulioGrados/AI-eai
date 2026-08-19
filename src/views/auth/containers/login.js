import { loginUser } from 'redux-path/auth'
import { LoginForm } from '../components/form'
import { useLogin } from '../../../hooks/auth'
import { useReduxState } from '../../../hooks/redux'
import { Logo, LogoMark } from '../../../components/logo'

import {
  LoginScreen,
  LoginBrandPanel,
  BrandTop,
  BrandBody,
  BrandTitle,
  BrandText,
  BrandFooter,
  LoginPanel,
  LoginCard,
  LoginMobileLogo,
  LoginTitle,
  LoginSubtitle,
  LoginFormCard,
  LoginFooter
} from '../styles/login.styd'

export const Login = () => {
  const authState = useReduxState('auth')

  const handleLogin = useLogin(loginUser, '/')

  return (
    <LoginScreen>
      <LoginBrandPanel>
        <BrandTop>
          <Logo variant='full' tone='light' size={30} id='login' />
        </BrandTop>
        <BrandBody>
          <BrandTitle>Cursos generados con inteligencia artificial</BrandTitle>
          <BrandText>
            Estructura, contenido y evaluaciones a partir de tu propio material,
            listos para revisar y publicar.
          </BrandText>
        </BrandBody>
        <BrandFooter>Escuela Americana de Innovación © 2026</BrandFooter>
      </LoginBrandPanel>

      <LoginPanel>
        <LoginCard>
          <LoginMobileLogo>
            <LogoMark size={40} id='login-mobile' />
          </LoginMobileLogo>
          <LoginTitle>Ingresa a tu cuenta</LoginTitle>
          <LoginSubtitle>Usa tus credenciales de administrador para continuar.</LoginSubtitle>
          <LoginFormCard>
            <LoginForm {...authState} handleLogin={handleLogin} />
          </LoginFormCard>
          <LoginFooter>Plataforma interna de la Escuela Americana de Innovación</LoginFooter>
        </LoginCard>
      </LoginPanel>
    </LoginScreen>
  )
}
