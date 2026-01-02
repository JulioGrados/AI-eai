import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getModules,
  editModule,
  addModule,
  deleteModule,
  reloadState
} from '../redux/module'

export const useModules = ({ course } = {}) => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.lesson
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading === false && course) {
      dispatch(
        getModules({
          query: { 'course.ref': course },
          sort: 'order'
        })
      )
    }
  }, [course])

  const update = async (id, data) => {
    return dispatch(editModule(id, { ...data }))
  }

  const create = async data => {
    return dispatch(addModule({ ...data }))
  }

  const remove = async id => {
    return dispatch(deleteModule(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const modules = list

  return {
    modules,
    loading,
    update,
    create,
    error,
    current,
    remove,
    loaded,
    reload
  }
}
