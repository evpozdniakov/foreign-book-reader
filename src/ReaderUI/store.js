import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import reducer from './reducers'

import {
  getInitState as getInternalInitState,
  serializeState as serializeInternalState,
} from './reducers/internal'

import {
  getInitState as getBookInitState,
  serializeState as serializeBookState,
} from './reducers/book'

import {
  getInitState as getListInitState,
  serializeState as serializeListState,
} from './reducers/list'

import {
  getInitState as getReaderInitState,
  serializeState as serializeReaderState,
} from './reducers/reader'

import api from './middlewares/api'

export function makeStore(data) {
  const initState = deserialize(data)
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

function deserialize(data) {
  const {
    internal={},
    list={},
    reader={},
    book={},
  } = data || {}

  return {
    internal: getInternalInitState(internal),
    book: getBookInitState(book),
    list: getListInitState(list),
    reader: getReaderInitState(reader),
  }
}

/*function readInitStateFromLocalStorage() {
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
}*/

export function serializeAppState(state) {
  return {
    internal: serializeInternalState(state.internal),
    book: serializeBookState(state.book),
    list: serializeListState(state.list),
    reader: serializeReaderState(state.reader),
  }
}
