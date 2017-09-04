import {
  DISPLAY,
  _LIST,
} from '../constants'

export function displayList() {
  return {
    type: DISPLAY + _LIST,
    data: {},
  }
}
