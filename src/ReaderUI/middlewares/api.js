import {
  ADD,
  CHANGE,
  OPEN,
  _BOOK,
  _ORIGINAL,
  _READER,
} from '../constants'

import { makeTitleFromTextIfNeeded } from './book'
import { handleAddBook } from './list'
import { handleOpenReader } from './reader'

export default store => next => action => {
  const { type } = action

  switch (type) {
    case CHANGE + _ORIGINAL: {
      next(action)
      makeTitleFromTextIfNeeded(store)
      break
    }

    case ADD + _BOOK: {
      handleAddBook(store, next, action)
      saveOriginalTextInLocalStorage(store)
      break
    }

    case OPEN + _READER: {
      handleOpenReader(store, next, action)
      break
    }

    default:
      next(action)
  }

  saveStateInLocalStorage(store)
}

function saveStateInLocalStorage(store) {
  if (!localStorage) {
    return
  }

  const { internal, reader, list } = store.getState()

  const state = {
    internal,
    reader,
    list: clearBookOriginalFromList(list),
  }

  localStorage.setItem('state', JSON.stringify(state))
}

function saveOriginalTextInLocalStorage(store) {
  if (!localStorage) {
    return
  }

  const { list } = store.getState()

  list.books.forEach(book => {
    const { id, original } = book

    localStorage.setItem(`orig-${id}`, original)
  })
}

function clearBookOriginalFromList(list) {
  return {
    ...list,
    books: list.books.map(clearOriginalFromBook),
  }
}

function clearOriginalFromBook(book) {
  const _book = {...book}

  delete _book.original

  return _book
}
