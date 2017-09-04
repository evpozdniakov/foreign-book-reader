import {
  DISPLAY,
  OPEN,
  _READER,
  _LIST,
} from '../constants'

export function displayList() {
  return {
    type: DISPLAY + _LIST,
    data: {},
  }
}

export function openReader(bookId) {
  return {
    type: OPEN + _READER,
    data: {bookId},
  }
}
