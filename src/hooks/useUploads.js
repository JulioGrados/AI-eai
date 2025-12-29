import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getUploads,
  addUpload,
  deleteUpload,
  reloadState
} from '../redux/upload'

export const useUploads = ({ course } = {}) => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.upload
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading === false && course) {
      dispatch(
        getUploads({
          query: { 'course.ref': course }
        })
      )
    }
  }, [course])

  const create = async data => {
    return dispatch(addUpload({ ...data }))
  }

  const remove = async id => {
    return dispatch(deleteUpload(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const uploads = list

  return {
    uploads,
    loading,
    create,
    error,
    current,
    remove,
    loaded,
    reload
  }
}
