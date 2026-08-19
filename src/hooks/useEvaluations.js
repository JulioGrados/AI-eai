import { useEffect, useState } from 'react'
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

  // `ready` indica que ya terminó la consulta de ESTE módulo. Sin esto, al
  // entrar a un módulo nuevo el estado todavía tiene la lista del módulo
  // anterior y no se puede distinguir "sin evaluación" de "aún no consultado"
  const [ready, setReady] = useState(!module)

  useEffect(() => {
    if (examId) {
      dispatch(getEvaluation(examId))
    }
  }, [examId])

  useEffect(() => {
    if (!module) {
      setReady(true)
      return
    }

    let alive = true
    setReady(false)

    // Siempre se recarga al cambiar de módulo. Antes había un `loading === false`
    // que, si coincidía con otra petición en curso, dejaba la consulta sin hacer
    Promise.resolve(
      dispatch(
        getEvaluations({
          query: { lesson: module }
        })
      )
    ).then(() => {
      if (alive) {
        setReady(true)
      }
    })

    return () => {
      alive = false
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
    ready,
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
