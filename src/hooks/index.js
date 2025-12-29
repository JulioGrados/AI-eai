import { useState } from 'react'

export const useStateData = (initialData = {}) => {
  const [data, setData] = useState(initialData)

  // cambiar una propiedad
  const changeData = (name, value) => {
    data[name] = value
    setData({ ...data })
  }

  // cambiar varias propiedades
  const changeAllData = data => {
    setData({ ...data })
  }

  const cleanData = () => {
    setData({})
  }

  return { data, changeData, cleanData, changeAllData }
}

export { useCourses } from './useCourses'
export { useModules } from './useModules'
export { useChapters } from './useChapters'
export { useChapterVersions } from './useChapterVersions'
export { useEvaluations } from './useEvaluations'
export { useEvaluationVersions } from './useEvaluationVersions'
export { useUploads } from './useUploads'
