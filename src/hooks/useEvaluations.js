import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getEvaluations,
  getEvaluation,
  editEvaluation,
  addEvaluation,
  deleteEvaluation,
  reloadState
} from '../redux/evaluation'

export const useEvaluations = ({ module, examId } = {}) => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.evaluation
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (examId && !loading) {
      dispatch(getEvaluation(examId))
    }
  }, [examId])

  useEffect(() => {
    if (loading === false && module) {
      dispatch(
        getEvaluations({
          query: { lesson: module }
        })
      )
    }
  }, [module])

  const update = async (id, data) => {
    return dispatch(editEvaluation(id, { ...data }))
  }

  const create = async data => {
    return dispatch(addEvaluation({ ...data }))
  }

  const remove = async id => {
    return dispatch(deleteEvaluation(id))
  }

  const get = async (id) => {
    return dispatch(getEvaluation(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const evaluations = list
  const exam = current

  return {
    evaluations,
    exam,
    loading,
    update,
    create,
    error,
    current,
    remove,
    get,
    loaded,
    reload
  }
}
