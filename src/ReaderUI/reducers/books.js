import {
  ADD,
  _BOOK,
} from '../constants'

export default (state={}, action) => {
  const { type, data } = action

  switch (type) {
    case ADD + _BOOK: {
      let clonedBooks = cloneBooks(state)

      return {
        ...state,
        items: clonedBooks.concat(data.book)
      }
    }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    items=[],
  } = data || {}

  return {
    items,
  }
}

function cloneBooks(state) {
  return state.items.map(item => {
    return {...item}
  })
}

export function serializeState(data) {
  const { items } = data;

  return {
    ...data,
    items: items.map(clearOriginal),
  }
}

function clearOriginal(book) {
  const _book = {...book}

  delete _book.original

  return _book
}
