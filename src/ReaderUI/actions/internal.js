import {
  DISPLAY,
  OPEN,
  _BOOK,
  _FORM,
  _READER,
  _LIST,
} from '../constants'

export function displayList() {
  return {
    type: DISPLAY + _LIST,
    data: {},
  }
}

export function displayBookForm() {
  return {
    type: DISPLAY + _BOOK + _FORM,
    data: {},
  }
}

export function openReader(bookId) {
  return {
    type: OPEN + _READER,
    data: {bookId},
  }
}
