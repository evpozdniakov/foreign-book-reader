import {
  CHANGE,
  _ORIGINAL,
} from '../constants'

export function changeOriginal(original) {
  return {
    type: CHANGE + _ORIGINAL,
    data: {original},
  }
}
