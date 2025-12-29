import {
  listChapters,
  createChapter,
  detailChapter,
  updateChapter,
  removeChapter
} from 'utils/api/chapter'
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

const LOADING_GET_CHAPTERS = 'AI_LOADING_GET_CHAPTERS'
const SUCCESS_GET_CHAPTERS = 'AI_SUCCESS_GET_CHAPTERS'
const ERROR_GET_CHAPTERS = 'AI_ERROR_GET_CHAPTERS'

const LOADING_ADD_CHAPTER = 'AI_LOADING_ADD_CHAPTER'
const SUCCESS_ADD_CHAPTER = 'AI_SUCCESS_ADD_CHAPTER'
const ERROR_ADD_CHAPTER = 'AI_ERROR_ADD_CHAPTER'

const LOADING_GET_CHAPTER = 'AI_LOADING_GET_CHAPTER'
const SUCCESS_GET_CHAPTER = 'AI_SUCCESS_GET_CHAPTER'
const ERROR_GET_CHAPTER = 'AI_ERROR_GET_CHAPTER'

const LOADING_EDIT_CHAPTER = 'AI_LOADING_EDIT_CHAPTER'
const SUCCESS_EDIT_CHAPTER = 'AI_SUCCESS_EDIT_CHAPTER'
const ERROR_EDIT_CHAPTER = 'AI_ERROR_EDIT_CHAPTER'

const LOADING_DELETE_CHAPTER = 'AI_LOADING_DELETE_CHAPTER'
const SUCCESS_DELETE_CHAPTER = 'AI_SUCCESS_DELETE_CHAPTER'
const ERROR_DELETE_CHAPTER = 'AI_ERROR_DELETE_CHAPTER'

const RELOAD_STATE = 'AI_CHAPTER_RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_CHAPTERS: {
      return loadingReducer(state)
    }
    case ERROR_GET_CHAPTERS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CHAPTERS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_CHAPTER: {
      return loadingReducer(state)
    }
    case ERROR_ADD_CHAPTER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_CHAPTER: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_CHAPTER: {
      return loadingReducer(state)
    }
    case ERROR_GET_CHAPTER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_CHAPTER: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_CHAPTER: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_CHAPTER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_CHAPTER: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_CHAPTER: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_CHAPTER: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_CHAPTER: {
      return successReducer(state, {
        list: removeItem(state.list, action.payload)
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
export const getChapters = (params = {}, extra = {}) => {
  return {
    types: [LOADING_GET_CHAPTERS, SUCCESS_GET_CHAPTERS, ERROR_GET_CHAPTERS],
    promise: () => listChapters(params),
    ...extra
  }
}

export const addChapter = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_CHAPTER, SUCCESS_ADD_CHAPTER, ERROR_ADD_CHAPTER],
    promise: () => createChapter(data),
    ...extra
  }
}

export const getChapter = (id, params = {}, extra = {}) => {
  return {
    types: [LOADING_GET_CHAPTER, SUCCESS_GET_CHAPTER, ERROR_GET_CHAPTER],
    promise: () => detailChapter(id, params),
    ...extra
  }
}

export const editChapter = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_CHAPTER, SUCCESS_EDIT_CHAPTER, ERROR_EDIT_CHAPTER],
    promise: () => updateChapter(id, data),
    ...extra
  }
}

export const deleteChapter = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_CHAPTER, SUCCESS_DELETE_CHAPTER, ERROR_DELETE_CHAPTER],
    promise: () => removeChapter(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
