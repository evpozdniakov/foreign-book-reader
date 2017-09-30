import {
  TRANSLATE,
  _TEXT,
} from '../constants'

export function translateText(text) {
  return {
    type: TRANSLATE + _TEXT,
    data: {text},
  }
}
