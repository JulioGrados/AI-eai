import {
  listChapterVersions,
  createChapterVersion,
  detailChapterVersion,
  updateChapterVersion,
  removeChapterVersion,
  setFavoriteVersion,
  editVersion
} from 'utils/api/chapterVersion'
import { reducers } from 'utils'

const {
  errorReducer,
  cleanReducer,
  loadingReducer,
  successReducer,
  updateItem,
  removeItem
} = reducers

// const
const initialValue = {
  list: [],
  current: null,
  loading: false,
  loaded: false,
  error: ''
}

const LOADING_GET_VERSIONS = 'AI_LOADING_GET_CHAPTER_VERSIONS'
const SUCCESS_GET_VERSIONS = 'AI_SUCCESS_GET_CHAPTER_VERSIONS'
const ERROR_GET_VERSIONS = 'AI_ERROR_GET_CHAPTER_VERSIONS'

const LOADING_ADD_VERSION = 'AI_LOADING_ADD_CHAPTER_VERSION'
const SUCCESS_ADD_VERSION = 'AI_SUCCESS_ADD_CHAPTER_VERSION'
const ERROR_ADD_VERSION = 'AI_ERROR_ADD_CHAPTER_VERSION'

const LOADING_GET_VERSION = 'AI_LOADING_GET_CHAPTER_VERSION'
const SUCCESS_GET_VERSION = 'AI_SUCCESS_GET_CHAPTER_VERSION'
const ERROR_GET_VERSION = 'AI_ERROR_GET_CHAPTER_VERSION'

const LOADING_EDIT_VERSION = 'AI_LOADING_EDIT_CHAPTER_VERSION'
const SUCCESS_EDIT_VERSION = 'AI_SUCCESS_EDIT_CHAPTER_VERSION'
const ERROR_EDIT_VERSION = 'AI_ERROR_EDIT_CHAPTER_VERSION'

const LOADING_DELETE_VERSION = 'AI_LOADING_DELETE_CHAPTER_VERSION'
const SUCCESS_DELETE_VERSION = 'AI_SUCCESS_DELETE_CHAPTER_VERSION'
const ERROR_DELETE_VERSION = 'AI_ERROR_DELETE_CHAPTER_VERSION'

const LOADING_SET_FAVORITE = 'AI_LOADING_SET_FAVORITE_VERSION'
const SUCCESS_SET_FAVORITE = 'AI_SUCCESS_SET_FAVORITE_VERSION'
const ERROR_SET_FAVORITE = 'AI_ERROR_SET_FAVORITE_VERSION'

const LOADING_EDIT_VERSION_CONTENT = 'AI_LOADING_EDIT_VERSION_CONTENT'
const SUCCESS_EDIT_VERSION_CONTENT = 'AI_SUCCESS_EDIT_VERSION_CONTENT'
const ERROR_EDIT_VERSION_CONTENT = 'AI_ERROR_EDIT_VERSION_CONTENT'

const RELOAD_STATE = 'AI_CHAPTER_VERSION_RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_VERSIONS: {
      return loadingReducer(state)
    }
    case ERROR_GET_VERSIONS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_VERSIONS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_VERSION: {
      return loadingReducer(state)
    }
    case ERROR_ADD_VERSION: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_VERSION: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_VERSION: {
      return loadingReducer(state)
    }
    case ERROR_GET_VERSION: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_VERSION: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_VERSION: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_VERSION: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_VERSION: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_VERSION: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_VERSION: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_VERSION: {
      return successReducer(state, {
        list: removeItem(state.list, action.payload)
      })
    }
    // SET FAVORITE
    case LOADING_SET_FAVORITE: {
      return loadingReducer(state)
    }
    case ERROR_SET_FAVORITE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_SET_FAVORITE: {
      return successReducer(state, {
        list: state.list.map(v =>
          ({ ...v, isFavorite: v._id === action.payload._id })
        )
      })
    }
    // EDIT VERSION CONTENT
    case LOADING_EDIT_VERSION_CONTENT: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_VERSION_CONTENT: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_VERSION_CONTENT: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // CLEAN
    case RELOAD_STATE: {
      return cleanReducer(state)
    }
    default:
      return state
  }
}

// actions
export const getChapterVersions = (params = {}, extra = {}) => {
  return {
    types: [LOADING_GET_VERSIONS, SUCCESS_GET_VERSIONS, ERROR_GET_VERSIONS],
    promise: () => listChapterVersions(params),
    ...extra
  }
}

export const addChapterVersion = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_VERSION, SUCCESS_ADD_VERSION, ERROR_ADD_VERSION],
    promise: () => createChapterVersion(data),
    ...extra
  }
}

export const getChapterVersion = (id, params = {}, extra = {}) => {
  return {
    types: [LOADING_GET_VERSION, SUCCESS_GET_VERSION, ERROR_GET_VERSION],
    promise: () => detailChapterVersion(id, params),
    ...extra
  }
}

export const editChapterVersion = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_VERSION, SUCCESS_EDIT_VERSION, ERROR_EDIT_VERSION],
    promise: () => updateChapterVersion(id, data),
    ...extra
  }
}

export const deleteChapterVersion = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_VERSION, SUCCESS_DELETE_VERSION, ERROR_DELETE_VERSION],
    promise: () => removeChapterVersion(id),
    ...extra
  }
}

export const markFavoriteVersion = (chapterId, versionId, extra = {}) => {
  return {
    types: [LOADING_SET_FAVORITE, SUCCESS_SET_FAVORITE, ERROR_SET_FAVORITE],
    promise: () => setFavoriteVersion(chapterId, versionId),
    ...extra
  }
}

export const editVersionContent = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_VERSION_CONTENT, SUCCESS_EDIT_VERSION_CONTENT, ERROR_EDIT_VERSION_CONTENT],
    promise: () => editVersion(id, data),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
