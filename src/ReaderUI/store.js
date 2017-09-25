import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import reducer from './reducers'
import { getInitState as getInternalInitState } from './reducers/internal'
import { getInitState as getBookInitState } from './reducers/book'
import { getInitState as getListInitState } from './reducers/list'
import { getInitState as getReaderInitState } from './reducers/reader'
import api from './middlewares/api'

export default function makeStore() {
  const initState = readInitStateFromLocalStorage() || deserialize()
  const middlewares = compose(getMiddleware())
  const store = createStore(reducer, initState, middlewares)

  if (NODE_ENV === 'development') {
    window.store = store
  }

  return store
}

function getMiddleware() {
  if (NODE_ENV === 'development') {
    return applyMiddleware(api, createLogger())
  }

  return applyMiddleware(api)
}

function deserialize(jsonStr) {
  const {
    internal={},
    list={},
    reader={},
    book={},
  } = JSON.parse(jsonStr || '{}')

  return {
    internal: getInternalInitState(internal),
    book: getBookInitState(book),
    list: getListInitState(list),
    reader: getReaderInitState(reader),
  }
}

function readInitStateFromLocalStorage() {
  if (!localStorage) {
    return null
  }

  const stateJsonStr = localStorage.getItem('state')

  if (!stateJsonStr) {
    return null
  }

  const state = JSON.parse(stateJsonStr)

  state.list.books.forEach(book => {
    const { id } = book

    book.original = localStorage.getItem(`orig-${id}`)
  })

  return state
}
