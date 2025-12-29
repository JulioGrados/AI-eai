import { useState } from 'react'
import { Form, Input, Select, InputNumber, Button, Icon, Upload, Spin, message } from 'antd'
import Router from 'next/router'

import {
  CreateCourseContainer,
  CreateCourseTitle,
  FormSection,
  ThemeInputContainer,
  AddThemeButton
} from '../styles/create.styd'
import { useCourses } from '../../../hooks'

const { Option } = Select

const CreateCourseForm = ({ form }) => {
  const { getFieldDecorator } = form
  const [themes, setThemes] = useState([{ theme: '', fileList: [] }])
  const [loading, setLoading] = useState(false)

  const { create } = useCourses()

  const addTheme = () => {
    setThemes([...themes, { theme: '', fileList: [] }])
  }

  const removeTheme = (index) => {
    setThemes(themes.filter((_, i) => i !== index))
  }

  const handleFileChange = (index, info) => {
    const newThemes = [...themes]
    newThemes[index].fileList = info.fileList
    setThemes(newThemes)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true)
        try {
          console.log('Form values:', values)
          console.log('Themes:', themes)

          message.loading('Generando curso con IA, esto puede tardar algunos minutos...', 0)

          // Crear FormData para enviar archivos
          const formData = new FormData()

          // Agregar los valores del formulario como JSON en el campo 'data'
          const dataToSend = {
            values: values,
            themes: themes.map((theme, index) => ({
              name: values[`theme_${index}`] || '',
              hasFiles: theme.fileList && theme.fileList.length > 0
            }))
          }
          formData.append('data', JSON.stringify(dataToSend))

          // Agregar los archivos reales
          themes.forEach((theme, index) => {
            if (theme.fileList && theme.fileList.length > 0) {
              theme.fileList.forEach((fileItem, fileIndex) => {
                if (fileItem.originFileObj) {
                  formData.append(`theme_${index}_file_${fileIndex}`, fileItem.originFileObj)
                }
              })
            }
          })

          await create(formData)

          message.destroy()
          message.success('¡Curso creado exitosamente!')

          // Redirigir a la lista de cursos
          Router.push('/cursos')
        } catch (error) {
          message.destroy()
          message.error('Error al crear el curso. Por favor intenta nuevamente.')
          console.error('Error creating course:', error)
        } finally {
          setLoading(false)
        }
      }
    })
  }

  return (
    <CreateCourseContainer>
      <CreateCourseTitle>Crear nuevo curso</CreateCourseTitle>
      <Form onSubmit={handleSubmit}>
        {/* Título del curso */}
        <Form.Item label="Título del curso">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Por favor ingresa el título del curso' }],
            initialValue: ''
          })(
            <Input placeholder="Por ejem. Curso de Marketing Digital" />
          )}
        </Form.Item>

        {/* Idioma del curso */}
        <Form.Item label="Idioma del curso">
          {getFieldDecorator('language', {
            initialValue: 'Spanish'
          })(
            <Select disabled>
              <Option value="Spanish">Spanish</Option>
              <Option value="English">English</Option>
              <Option value="French">French</Option>
            </Select>
          )}
        </Form.Item>

        {/* Nivel académico */}
        <Form.Item label="Nivel académico">
          {getFieldDecorator('academicLevel', {
            initialValue: 'Formación continua'
          })(
            <Select disabled>
              <Option value="Formación continua">Formación continua</Option>
              <Option value="Pregrado">Pregrado</Option>
              <Option value="Postgrado">Postgrado</Option>
            </Select>
          )}
        </Form.Item>

        {/* Cantidad de módulos */}
        <Form.Item label="Cantidad de módulos">
          {getFieldDecorator('moduleCount', {
            initialValue: 10,
            rules: [{ required: true, message: 'Por favor selecciona la cantidad de módulos' }]
          })(
            <InputNumber min={1} max={20} style={{ width: '100%' }} />
          )}
        </Form.Item>

        {/* Ingresa una materia */}
        <Form.Item label="Ingresa una materia">
          {getFieldDecorator('subject', {
            rules: [{ required: true, message: 'Por favor ingresa la materia' }],
            initialValue: ''
          })(
            <Input placeholder="Por ejem. Marketing digital" />
          )}
        </Form.Item>

        {/* Temas dinámicos con archivos */}
        {themes.map((themeItem, index) => (
          <FormSection key={index}>
            <ThemeInputContainer>
              <div style={{ flex: 1 }}>
                <Form.Item label={`Ingresa tema ${index + 1}`}>
                  {getFieldDecorator(`theme_${index}`, {
                    initialValue: ''
                  })(
                    <Input placeholder={`Tema ${index + 1}`} />
                  )}
                </Form.Item>
              </div>
              <div style={{ flex: 1 }}>
                <Form.Item label="Archivos" style={{width: '100%'}}>
                  {getFieldDecorator(`files_${index}`)(
                    <Upload
                      name="file"
                      accept=".pdf"
                      fileList={themeItem.fileList}
                      onChange={(info) => handleFileChange(index, info)}
                      beforeUpload={() => false}
                    >
                      <Button>
                        <Icon type="upload" /> Haz clic para explorar archivos
                      </Button>
                    </Upload>
                  )}
                </Form.Item>
              </div>
              {themes.length > 1 && (
                <Icon
                  type="delete"
                  onClick={() => removeTheme(index)}
                  style={{ color: '#ff4d4f', cursor: 'pointer', fontSize: '18px', marginTop: '40px' }}
                />
              )}
            </ThemeInputContainer>
          </FormSection>
        ))}

        <AddThemeButton onClick={addTheme}>
          + Agregar otro tema
        </AddThemeButton>

        {/* Botón continuar */}
        <Form.Item style={{ marginTop: '30px' }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '200px' }}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Generando curso...' : 'Continuar →'}
          </Button>
        </Form.Item>

        {/* Mensaje de información mientras carga */}
        {loading && (
          <div style={{ marginTop: '20px', textAlign: 'center', color: '#1890ff' }}>
            <Spin size="large" />
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              El asistente de IA está generando tu curso.<br />
              Este proceso puede tardar entre 30 segundos y 3 minutos.
            </p>
          </div>
        )}
      </Form>
    </CreateCourseContainer>
  )
}

export const CreateCourseFormWrapped = Form.create({ name: 'create_course' })(CreateCourseForm)
