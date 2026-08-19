import { Form, Icon, Input, Button, Alert } from 'antd'

const Login = ({ error, loading, handleLogin, form }) => {
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        handleLogin(values.username, values.password)
      }
    })
  }
  const { getFieldDecorator } = form

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label='Usuario'>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Ingresa tu usuario' }]
        })(
          <Input
            prefix={<Icon type='user' style={{ color: '#95a1b5' }} />}
            placeholder='Usuario'
            autoComplete='username'
          />
        )}
      </Form.Item>

      <Form.Item label='Contraseña'>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Ingresa tu contraseña' }]
        })(
          <Input
            prefix={<Icon type='lock' style={{ color: '#95a1b5' }} />}
            type='password'
            placeholder='Contraseña'
            autoComplete='current-password'
          />
        )}
      </Form.Item>

      {error && (
        <Form.Item style={{ marginBottom: 16 }}>
          <Alert type='error' message={error} showIcon />
        </Form.Item>
      )}

      <Form.Item style={{ marginBottom: 0 }}>
        <Button type='primary' htmlType='submit' loading={loading} size='large' block>
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  )
}

export const LoginForm = Form.create({ name: 'login' })(Login)
