import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import reducer from './reducers'
import { getInitState as getInternalInitState } from './reducers/internal'
import api from './middlewares/api'

/**
*/
export default function makeStore(data) {
  const initState = getInitState(data)
  const middlewares = compose(getMiddleware())
  const store = createStore(reducer, initState, middlewares)

  if (true) {
    window.store = store
  }

  return store
}

/**
*/
function getInitState(data) {
  return {
    internal: getInternalInitState(data),
  }
}

/**
*/
function getMiddleware() {
  if (true) {
    return applyMiddleware(api, createLogger())
  }

  return applyMiddleware(api)
}