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
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }]
        })(
          <Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Username'
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
            type='password'
            placeholder='Contraseña'
          />
        )}
      </Form.Item>
      <Form.Item>
        {error && <Alert type='error' description={error} />}
        <Button type='primary' htmlType='submit' loading={loading} block>
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  )
}

export const LoginForm = Form.create({ name: 'login' })(Login)
