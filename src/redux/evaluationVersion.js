import {
  listExamVersions,
  createExamVersion,
  detailExamVersion,
  updateExamVersion,
  removeExamVersion,
  setFavoriteVersion,
  editVersion
} from 'utils/api/examVersion'
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

const LOADING_GET_EVALUATIONVERSIONS = 'AI_LOADING_GET_EVALUATIONVERSIONS'
const SUCCESS_GET_EVALUATIONVERSIONS = 'AI_SUCCESS_GET_EVALUATIONVERSIONS'
const ERROR_GET_EVALUATIONVERSIONS = 'AI_ERROR_GET_EVALUATIONVERSIONS'

const LOADING_ADD_EVALUATIONVERSION = 'AI_LOADING_ADD_EVALUATIONVERSION'
const SUCCESS_ADD_EVALUATIONVERSION = 'AI_SUCCESS_ADD_EVALUATIONVERSION'
const ERROR_ADD_EVALUATIONVERSION = 'AI_ERROR_ADD_EVALUATIONVERSION'

const LOADING_GET_EVALUATIONVERSION = 'AI_LOADING_GET_EVALUATIONVERSION'
const SUCCESS_GET_EVALUATIONVERSION = 'AI_SUCCESS_GET_EVALUATIONVERSION'
const ERROR_GET_EVALUATIONVERSION = 'AI_ERROR_GET_EVALUATIONVERSION'

const LOADING_EDIT_EVALUATIONVERSION = 'AI_LOADING_EDIT_EVALUATIONVERSION'
const SUCCESS_EDIT_EVALUATIONVERSION = 'AI_SUCCESS_EDIT_EVALUATIONVERSION'
const ERROR_EDIT_EVALUATIONVERSION = 'AI_ERROR_EDIT_EVALUATIONVERSION'

const LOADING_DELETE_EVALUATIONVERSION = 'AI_LOADING_DELETE_EVALUATIONVERSION'
const SUCCESS_DELETE_EVALUATIONVERSION = 'AI_SUCCESS_DELETE_EVALUATIONVERSION'
const ERROR_DELETE_EVALUATIONVERSION = 'AI_ERROR_DELETE_EVALUATIONVERSION'

const LOADING_SET_FAVORITE = 'AI_LOADING_SET_FAVORITE_EVALUATION_VERSION'
const SUCCESS_SET_FAVORITE = 'AI_SUCCESS_SET_FAVORITE_EVALUATION_VERSION'
const ERROR_SET_FAVORITE = 'AI_ERROR_SET_FAVORITE_EVALUATION_VERSION'

const LOADING_EDIT_VERSION_CONTENT = 'AI_LOADING_EDIT_EVALUATION_VERSION_CONTENT'
const SUCCESS_EDIT_VERSION_CONTENT = 'AI_SUCCESS_EDIT_EVALUATION_VERSION_CONTENT'
const ERROR_EDIT_VERSION_CONTENT = 'AI_ERROR_EDIT_EVALUATION_VERSION_CONTENT'

const RELOAD_STATE = 'AI_EVALUATIONVERSION_RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_EVALUATIONVERSIONS: {
      return loadingReducer(state)
    }
    case ERROR_GET_EVALUATIONVERSIONS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_EVALUATIONVERSIONS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_EVALUATIONVERSION: {
      return loadingReducer(state)
    }
    case ERROR_ADD_EVALUATIONVERSION: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_EVALUATIONVERSION: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_EVALUATIONVERSION: {
      return loadingReducer(state)
    }
    case ERROR_GET_EVALUATIONVERSION: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_EVALUATIONVERSION: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // UPDATE
    case LOADING_EDIT_EVALUATIONVERSION: {
      return loadingReducer(state)
    }
    case ERROR_EDIT_EVALUATIONVERSION: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_EDIT_EVALUATIONVERSION: {
      return successReducer(state, {
        list: updateItem(state.list, action.payload),
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_EVALUATIONVERSION: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_EVALUATIONVERSION: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_EVALUATIONVERSION: {
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
export const getEvaluationVersions = (params = {}, extra = {}) => {
  return {
    types: [LOADING_GET_EVALUATIONVERSIONS, SUCCESS_GET_EVALUATIONVERSIONS, ERROR_GET_EVALUATIONVERSIONS],
    promise: () => listExamVersions(params),
    ...extra
  }
}

export const addEvaluationVersion = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_EVALUATIONVERSION, SUCCESS_ADD_EVALUATIONVERSION, ERROR_ADD_EVALUATIONVERSION],
    promise: () => createExamVersion(data),
    ...extra
  }
}

export const getEvaluationVersion = (id, params = {}, extra = {}) => {
  return {
    types: [LOADING_GET_EVALUATIONVERSION, SUCCESS_GET_EVALUATIONVERSION, ERROR_GET_EVALUATIONVERSION],
    promise: () => detailExamVersion(id, params),
    ...extra
  }
}

export const editEvaluationVersion = (id, data, extra = {}) => {
  return {
    types: [LOADING_EDIT_EVALUATIONVERSION, SUCCESS_EDIT_EVALUATIONVERSION, ERROR_EDIT_EVALUATIONVERSION],
    promise: () => updateExamVersion(id, data),
    ...extra
  }
}

export const deleteEvaluationVersion = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_EVALUATIONVERSION, SUCCESS_DELETE_EVALUATIONVERSION, ERROR_DELETE_EVALUATIONVERSION],
    promise: () => removeExamVersion(id),
    ...extra
  }
}

export const markFavoriteVersion = (examId, versionId, extra = {}) => {
  return {
    types: [LOADING_SET_FAVORITE, SUCCESS_SET_FAVORITE, ERROR_SET_FAVORITE],
    promise: () => setFavoriteVersion(examId, versionId),
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
