import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import reducer from './reducers'

import {
  getInitState as getInternalInitState,
  serializeState as serializeInternalState,
} from './reducers/internal'

import {
  getInitState as getBookFormInitState,
  serializeState as serializeBookFormState,
} from './reducers/bookForm'

import {
  getInitState as getBooksInitState,
  serializeState as serializeBooksState,
} from './reducers/books'

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
    books={},
    reader={},
    bookForm={},
  } = data || {}

  return {
    internal: getInternalInitState(internal),
    bookForm: getBookFormInitState(bookForm),
    books: getBooksInitState(books),
    reader: getReaderInitState(reader),
  }
}

export function serializeAppState(state) {
  return {
    internal: serializeInternalState(state.internal),
    bookForm: serializeBookFormState(state.bookForm),
    books: serializeBooksState(state.books),
    reader: serializeReaderState(state.reader),
  }
}
