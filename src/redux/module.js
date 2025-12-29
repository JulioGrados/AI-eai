import {
  listLessons,
  createLesson,
  detailLesson,
  updateLesson,
  removeLesson
} from 'utils/api/lessons'
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

const LOADING_GET_MODULES = 'AI_LOADING_GET_MODULES'
const SUCCESS_GET_MODULES = 'AI_SUCCESS_GET_MODULES'
const ERROR_GET_MODULES = 'AI_ERROR_GET_MODULES'

const LOADING_ADD_MODULE = 'AI_LOADING_ADD_MODULE'
const SUCCESS_ADD_MODULE = 'AI_SUCCESS_ADD_MODULE'
const ERROR_ADD_MODULE = 'AI_ERROR_ADD_MODULE'

const LOADING_GET_MODULE = 'AI_LOADING_GET_MODULE'
const SUCCESS_GET_MODULE = 'AI_SUCCESS_GET_MODULE'
const ERROR_GET_MODULE = 'AI_ERROR_GET_MODULE'

const LOADING_EDIT_MODULE = 'AI_LOADING_EDIT_MODULE'
const SUCCESS_EDIT_MODULE = 'AI_SUCCESS_EDIT_MODULE'
const ERROR_EDIT_MODULE = 'AI_ERROR_EDIT_MODULE'

const LOADING_DELETE_MODULE = 'AI_LOADING_DELETE_MODULE'
const SUCCESS_DELETE_MODULE = 'AI_SUCCESS_DELETE_MODULE'
const ERROR_DELETE_MODULE = 'AI_ERROR_DELETE_MODULE'

const RELOAD_STATE = 'AI_MODULE_RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_MODULES: {
      return loadingReducer(state)
    }
    case ERROR_GET_MODULES: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_MODULES: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_MODULE: {
      return loadingReducer(state)
    }
    case ERROR_ADD_MODULE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_MODULE: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_MODULE: {
      return loadingReducer(state)
    }
    case ERROR_GET_MODULE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_MODULE: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_MODULE: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_MODULE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_MODULE: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_MODULE: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_MODULE: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_MODULE: {
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
export const getModules = (params, extra = {}) => {
  return {
    types: [LOADING_GET_MODULES, SUCCESS_GET_MODULES, ERROR_GET_MODULES],
    promise: () => listLessons(params),
    ...extra
  }
}

export const addModule = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_MODULE, SUCCESS_ADD_MODULE, ERROR_ADD_MODULE],
    promise: () => createLesson(data),
    ...extra
  }
}

export const getModule = (id, params = {}, extra = {}) => {
  return {
    types: [LOADING_GET_MODULE, SUCCESS_GET_MODULE, ERROR_GET_MODULE],
    promise: () => detailLesson(id, params),
    ...extra
  }
}

export const editModule = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_MODULE, SUCCESS_EDIT_MODULE, ERROR_EDIT_MODULE],
    promise: () => updateLesson(id, data),
    ...extra
  }
}

export const deleteModule = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_MODULE, SUCCESS_DELETE_MODULE, ERROR_DELETE_MODULE],
    promise: () => removeLesson(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
