import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createMiddleware from './middleware'

import auth, { getAuthUser } from './auth'
import course from './course'
import lesson from './module'
import chapter from './chapter'
import chapterVersion from './chapterVersion'
import evaluation from './evaluation'
import evaluationVersion from './evaluationVersion'
import upload from './upload'

const reducers = combineReducers({
  auth,
  course,
  lesson,
  chapter,
  chapterVersion,
  evaluation,
  evaluationVersion,
  upload
})

const middleware = [createMiddleware, thunk]

export const initStore = () => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  getAuthUser()(store.dispatch)
  return store
}
