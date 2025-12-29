import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getChapterVersions,
  editChapterVersion,
  addChapterVersion,
  deleteChapterVersion,
  markFavoriteVersion,
  editVersionContent,
  reloadState
} from '../redux/chapterVersion'

export const useChapterVersions = ({ chapter } = {}) => {
  const { list, loading, error, current, loaded } = useSelector(
    state => state.chapterVersion
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading === false && chapter) {
      dispatch(
        getChapterVersions({
          query: { 'chapter.ref': chapter }
        })
      )
    }
  }, [chapter])

  const update = async (id, data) => {
    return dispatch(editChapterVersion(id, { ...data }))
  }

  const create = async data => {
    return dispatch(addChapterVersion({ ...data }))
  }

  const remove = async id => {
    return dispatch(deleteChapterVersion(id))
  }

  const setFavorite = async (chapterId, versionId) => {
    return dispatch(markFavoriteVersion(chapterId, versionId))
  }

  const editContent = async (id, data) => {
    return dispatch(editVersionContent(id, { ...data}))
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
