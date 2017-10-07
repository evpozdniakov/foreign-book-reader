import {
  PRONOUNCE,
  TRANSLATE,
  _TEXT,
} from '../constants'

export function translateText(text) {
  return {
    type: TRANSLATE + _TEXT,
    data: {text},
  }
}

export function pronounceText() {
  return {
    type: PRONOUNCE + _TEXT,
    data: {},
  }
}
