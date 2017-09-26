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
        books: clonedBooks.concat(data.book)
      }
    }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    books=[],
  } = data || {}

  return {
    books,
  }
}

function cloneBooks(state) {
  return state.books.map(item => {
    return {...item}
  })
}

export function serializeState(data) {
  const { books } = data;

  return {
    ...data,
    books: books.map(clearOriginal),
  }
}

function clearOriginal(book) {
  const _book = {...book}

  delete _book.original

  return _book
}
