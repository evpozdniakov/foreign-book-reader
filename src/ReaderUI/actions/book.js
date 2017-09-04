import {
  CHANGE,
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
