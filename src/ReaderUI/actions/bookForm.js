import {
  ADD,
  CHANGE,
  _BOOK,
  _TITLE,
  _ORIGINAL,
} from '../constants'

export function changeOriginal(original) {
  return {
    type: CHANGE + _ORIGINAL,
    data: {original},
  }
}

export function changeTitle(title) {
  return {
    type: CHANGE + _TITLE,
    data: {title},
  }
}

export function addBook() {
  return {
    type: ADD + _BOOK,
    data: {},
  }
}
