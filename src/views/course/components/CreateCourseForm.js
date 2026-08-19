import { useState } from 'react'
import { Form, Input, Select, InputNumber, Button, Icon, Upload, message } from 'antd'
import Router from 'next/router'

import { useCourses } from '../../../hooks'
import {
  Panel,
  PanelSection,
  SectionTitle,
  PageHead,
  PrimaryButton,
  IconButton,
  Chip
} from '../../../components/ui'
import {
  FormGrid,
  ThemeCard,
  ThemeCardHeader,
  ThemeIndex,
  ThemeLabel,
  ThemeBody,
  AddThemeButton,
  FormFooter,
  FooterHint,
  GeneratingPanel,
  GeneratingTitle,
  GeneratingText
} from '../styles/create.styd'

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
    const values = form.getFieldsValue()
    const nextThemes = themes.filter((_, i) => i !== index)

    // Los campos se llaman theme_0, theme_1... así que al quitar uno del medio
    // hay que correr los valores hacia arriba para que no queden desalineados
    const shifted = {}
    nextThemes.forEach((_, i) => {
      shifted[`theme_${i}`] = values[`theme_${i >= index ? i + 1 : i}`] || ''
    })

    setThemes(nextThemes)
    form.setFieldsValue(shifted)
  }

  const handleFileChange = (index, info) => {
    const newThemes = [...themes]
    newThemes[index].fileList = info.fileList
    setThemes(newThemes)
  }

  const totalFiles = themes.reduce(
    (total, theme) => total + ((theme.fileList && theme.fileList.length) || 0),
    0
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true)
        try {
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
    <>
      <PageHead
        title='Crear curso'
        subtitle='Define la estructura y sube el material: la IA generará los módulos y las lecciones.'
        onBack={() => Router.push('/cursos')}
      />

      <Panel>
        <Form onSubmit={handleSubmit}>
          <PanelSection>
            <SectionTitle>Información del curso</SectionTitle>

            <Form.Item label='Título del curso'>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Por favor ingresa el título del curso' }],
                initialValue: ''
              })(
                <Input placeholder='Por ejem. Curso de Marketing Digital' />
              )}
            </Form.Item>

            <Form.Item label='Materia'>
              {getFieldDecorator('subject', {
                rules: [{ required: true, message: 'Por favor ingresa la materia' }],
                initialValue: ''
              })(
                <Input placeholder='Por ejem. Marketing digital' />
              )}
            </Form.Item>

            <FormGrid>
              <Form.Item label='Idioma'>
                {getFieldDecorator('language', {
                  initialValue: 'Spanish'
                })(
                  <Select disabled>
                    <Option value='Spanish'>Spanish</Option>
                    <Option value='English'>English</Option>
                    <Option value='French'>French</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item label='Nivel académico'>
                {getFieldDecorator('academicLevel', {
                  initialValue: 'Formación continua'
                })(
                  <Select disabled>
                    <Option value='Formación continua'>Formación continua</Option>
                    <Option value='Pregrado'>Pregrado</Option>
                    <Option value='Postgrado'>Postgrado</Option>
                  </Select>
                )}
              </Form.Item>
            </FormGrid>
          </PanelSection>

          <PanelSection>
            <SectionTitle>Estructura</SectionTitle>

            <FormGrid>
              <Form.Item label='Cantidad de módulos'>
                {getFieldDecorator('moduleCount', {
                  initialValue: 10,
                  rules: [{ required: true, message: 'Por favor selecciona la cantidad de módulos' }]
                })(
                  <InputNumber min={1} max={20} style={{ width: '100%' }} />
                )}
              </Form.Item>

              <Form.Item label='Lecciones por módulo'>
                {getFieldDecorator('lessonCount', {
                  initialValue: 5,
                  rules: [{ required: true, message: 'Por favor selecciona la cantidad de lecciones por módulo' }]
                })(
                  <InputNumber min={1} max={15} style={{ width: '100%' }} />
                )}
              </Form.Item>
            </FormGrid>
          </PanelSection>

          <PanelSection>
            <SectionTitle>Temas y material de apoyo</SectionTitle>

            {themes.map((themeItem, index) => {
              const fileCount = (themeItem.fileList && themeItem.fileList.length) || 0

              return (
                <ThemeCard key={index}>
                  <ThemeCardHeader>
                    <ThemeIndex>{index + 1}</ThemeIndex>
                    <ThemeLabel>Tema {index + 1}</ThemeLabel>
                    {fileCount > 0 && (
                      <Chip $tone='brand'>
                        {fileCount} {fileCount === 1 ? 'archivo' : 'archivos'}
                      </Chip>
                    )}
                    {themes.length > 1 && (
                      <IconButton
                        $danger
                        type='button'
                        title='Quitar tema'
                        onClick={() => removeTheme(index)}
                      >
                        <Icon type='delete' />
                      </IconButton>
                    )}
                  </ThemeCardHeader>

                  <ThemeBody>
                    <Form.Item label='Nombre del tema'>
                      {getFieldDecorator(`theme_${index}`, {
                        initialValue: ''
                      })(
                        <Input placeholder={`Por ejem. Tema ${index + 1}`} />
                      )}
                    </Form.Item>

                    <Form.Item label='Archivos PDF (opcional)'>
                      {getFieldDecorator(`files_${index}`)(
                        <Upload
                          name='file'
                          accept='.pdf'
                          multiple
                          fileList={themeItem.fileList}
                          onChange={(info) => handleFileChange(index, info)}
                          beforeUpload={() => false}
                        >
                          <Button style={{ width: '100%' }}>
                            <Icon type='upload' /> Seleccionar archivos
                          </Button>
                        </Upload>
                      )}
                    </Form.Item>
                  </ThemeBody>
                </ThemeCard>
              )
            })}

            <AddThemeButton type='button' onClick={addTheme}>
              <Icon type='plus' />
              Agregar otro tema
            </AddThemeButton>
          </PanelSection>

          <FormFooter>
            <PrimaryButton type='submit' $size='lg' disabled={loading}>
              <Icon type={loading ? 'loading' : 'thunderbolt'} />
              {loading ? 'Generando curso...' : 'Generar curso'}
            </PrimaryButton>
            <FooterHint>
              {totalFiles > 0
                ? `${themes.length} ${themes.length === 1 ? 'tema' : 'temas'} · ${totalFiles} ${totalFiles === 1 ? 'archivo' : 'archivos'} de apoyo`
                : `${themes.length} ${themes.length === 1 ? 'tema' : 'temas'} · sin archivos de apoyo`}
            </FooterHint>
          </FormFooter>

          {loading && (
            <GeneratingPanel>
              <Icon type='loading' style={{ fontSize: 26, color: '#0080ff' }} />
              <div>
                <GeneratingTitle>El asistente está armando tu curso</GeneratingTitle>
                <GeneratingText>
                  Este proceso puede tardar entre 30 segundos y 3 minutos. No cierres esta ventana.
                </GeneratingText>
              </div>
            </GeneratingPanel>
          )}
        </Form>
      </Panel>
    </>
  )
}

export const CreateCourseFormWrapped = Form.create({ name: 'create_course' })(CreateCourseForm)
