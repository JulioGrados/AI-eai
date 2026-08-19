import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getChapters,
  getChapter,
  editChapter,
  addChapter,
  deleteChapter,
  reloadState
} from '../redux/chapter'

export const useChapters = ({ module, chapterId } = {}) => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.chapter
  )
  const dispatch = useDispatch()

  // Marca que la consulta de ESTE capítulo ya terminó: hasta entonces el
  // estado todavía puede tener el capítulo anterior
  const [ready, setReady] = useState(!chapterId)

  useEffect(() => {
    if (module) {
      dispatch(
        getChapters({
          query: { lesson: module }
        })
      )
    }
  }, [module])

  useEffect(() => {
    if (!chapterId) {
      setReady(true)
      return
    }

    let alive = true
    setReady(false)

    Promise.resolve(dispatch(getChapter(chapterId))).then(() => {
      if (alive) {
        setReady(true)
      }
    })

    return () => {
      alive = false
    }
  }, [chapterId])

  const update = async (id, data) => {
    return dispatch(editChapter(id, { ...data }))
  }

  const create = async data => {
    return dispatch(addChapter({ ...data }))
  }

  const remove = async id => {
    return dispatch(deleteChapter(id))
  }

  const reload = async () => {
    return dispatch(reloadState())
  }

  const get = async (id) => {
    return dispatch(getChapter(id))
  }

  const chapters = list
  const chapter = current

  return {
    chapters,
    chapter,
    loading,
    ready,
    update,
    create,
    error,
    current,
    remove,
    loaded,
    reload,
    get
  }
}
