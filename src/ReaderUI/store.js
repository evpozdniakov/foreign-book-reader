import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import reducer from './reducers'
import { getInitState as getInternalInitState } from './reducers/internal'
import { getInitState as getBookInitState } from './reducers/book'
import { getInitState as getListInitState } from './reducers/list'
import { getInitState as getReaderInitState } from './reducers/reader'
import api from './middlewares/api'

/**
*/
export default function makeStore(data) {
  const initState = getInitState(data)
  const middlewares = compose(getMiddleware())
  const store = createStore(reducer, initState, middlewares)

  if (NODE_ENV === 'development') {
    window.store = store
  }

  return store
}

/**
*/
function getInitState(data) {
  return {
    internal: getInternalInitState(data),
    book: getBookInitState(data),
    list: getListInitState(data),
    reader: getReaderInitState(data),
  }
}

/**
*/
function getMiddleware() {
  if (NODE_ENV === 'development') {
    return applyMiddleware(api, createLogger())
  }

  return applyMiddleware(api)
}
