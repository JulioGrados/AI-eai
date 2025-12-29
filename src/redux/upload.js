import {
  listUploads,
  createUpload,
  detailUpload,
  removeUpload
} from 'utils/api/upload'
import { reducers } from 'utils'

const {
  errorReducer,
  cleanReducer,
  loadingReducer,
  successReducer,
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

const LOADING_GET_UPLOADS = 'AI_LOADING_GET_UPLOADS'
const SUCCESS_GET_UPLOADS = 'AI_SUCCESS_GET_UPLOADS'
const ERROR_GET_UPLOADS = 'AI_ERROR_GET_UPLOADS'

const LOADING_ADD_UPLOAD = 'AI_LOADING_ADD_UPLOAD'
const SUCCESS_ADD_UPLOAD = 'AI_SUCCESS_ADD_UPLOAD'
const ERROR_ADD_UPLOAD = 'AI_ERROR_ADD_UPLOAD'

const LOADING_GET_UPLOAD = 'AI_LOADING_GET_UPLOAD'
const SUCCESS_GET_UPLOAD = 'AI_SUCCESS_GET_UPLOAD'
const ERROR_GET_UPLOAD = 'AI_ERROR_GET_UPLOAD'

const LOADING_DELETE_UPLOAD = 'AI_LOADING_DELETE_UPLOAD'
const SUCCESS_DELETE_UPLOAD = 'AI_SUCCESS_DELETE_UPLOAD'
const ERROR_DELETE_UPLOAD = 'AI_ERROR_DELETE_UPLOAD'

const RELOAD_STATE = 'AI_UPLOAD_RELOAD_STATE'

// reducer
export default function reducer (state = initialValue, action) {
  switch (action.type) {
    // LIST
    case LOADING_GET_UPLOADS: {
      return loadingReducer(state)
    }
    case ERROR_GET_UPLOADS: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_UPLOADS: {
      return successReducer(state, {
        list: action.payload,
        loaded: true
      })
    }
    // CREATE
    case LOADING_ADD_UPLOAD: {
      return loadingReducer(state)
    }
    case ERROR_ADD_UPLOAD: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_ADD_UPLOAD: {
      return successReducer(state, {
        list: state.loaded ? [action.payload, ...state.list] : []
      })
    }
    // DETAIL
    case LOADING_GET_UPLOAD: {
      return loadingReducer(state)
    }
    case ERROR_GET_UPLOAD: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_GET_UPLOAD: {
      return successReducer(state, {
        current: action.payload
      })
    }
    // DELETE
    case LOADING_DELETE_UPLOAD: {
      return loadingReducer(state)
    }
    case ERROR_DELETE_UPLOAD: {
      return errorReducer(state, action.payload)
    }
    case SUCCESS_DELETE_UPLOAD: {
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
export const getUploads = (params = {}, extra = {}) => {
  return {
    types: [LOADING_GET_UPLOADS, SUCCESS_GET_UPLOADS, ERROR_GET_UPLOADS],
    promise: () => listUploads(params),
    ...extra
  }
}

export const addUpload = (data, extra = {}) => {
  return {
    types: [LOADING_ADD_UPLOAD, SUCCESS_ADD_UPLOAD, ERROR_ADD_UPLOAD],
    promise: () => createUpload(data),
    ...extra
  }
}

export const getUpload = (id, params = {}, extra = {}) => {
  return {
    types: [LOADING_GET_UPLOAD, SUCCESS_GET_UPLOAD, ERROR_GET_UPLOAD],
    promise: () => detailUpload(id, params),
    ...extra
  }
}

export const deleteUpload = (id, extra = {}) => {
  return {
    types: [LOADING_DELETE_UPLOAD, SUCCESS_DELETE_UPLOAD, ERROR_DELETE_UPLOAD],
    promise: () => removeUpload(id),
    ...extra
  }
}

export const reloadState = () => {
  return {
    type: RELOAD_STATE
  }
}
