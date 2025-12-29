import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getEvaluationVersions,
  editEvaluationVersion,
  addEvaluationVersion,
  deleteEvaluationVersion,
  markFavoriteVersion,
  editVersionContent,
  reloadState
} from '../redux/evaluationVersion'

export const useEvaluationVersions = ({ exam } = {}) => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.evaluationVersion
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading === false && exam) {
      dispatch(
        getEvaluationVersions({
          query: { 'exam.ref': exam }
        })
      )
    }
  }, [exam])

  const update = async (id, data) => {
    return dispatch(editEvaluationVersion(id, { ...data }))
  }

  const create = async data => {
    return dispatch(addEvaluationVersion({ ...data }))
  }

  const remove = async id => {
    return dispatch(deleteEvaluationVersion(id))
  }

  const setFavorite = async (examId, versionId) => {
    return dispatch(markFavoriteVersion(examId, versionId))
  }

  const editContent = async (id, data) => {
    return dispatch(editVersionContent(id, { ...data }))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const versions = list

  return {
    versions,
    loading,
    update,
    create,
    error,
    current,
    remove,
    setFavorite,
    editContent,
    loaded,
    reload
  }
}
