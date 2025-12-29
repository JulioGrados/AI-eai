import { useEffect } from 'react'
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

  useEffect(() => {
    if (loading === false && module) {
      dispatch(
        getChapters({
          query: { lesson: module }
        })
      )
    }
  }, [module])

  useEffect(() => {
    if (chapterId && !loading) {
      dispatch(getChapter(chapterId))
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
