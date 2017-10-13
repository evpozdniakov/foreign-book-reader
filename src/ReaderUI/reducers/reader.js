import {
  OPEN,
  PRONOUNCE,
  TRANSLATE,
  _READER,
  _TEXT,
  _START, _DONE, _FAIL,
} from '../constants'

export default (state={}, action) => {
  const { type, data, response, error } = action

  switch (type) {
    case OPEN + _READER:
      return {
        ...state,
        book: data.book,
        pronounce: 0,
        translationInfo: {},
        translatingText: '',
      }

    case PRONOUNCE + _TEXT:
      return {
        ...state,
        pronounce: 1 + state.pronounce,
      }

    case TRANSLATE + _TEXT + _START:
      return {
        ...state,
        pronounce: 0,
        isTranslating: true,
        error: null,
        translatingText: data.text,
      }

    case TRANSLATE + _TEXT + _DONE:
      return {
        ...state,
        isTranslating: false,
        translationInfo: response,
      }

    case TRANSLATE + _TEXT + _FAIL:
      return {
        ...state,
        isTranslating: false,
        error,
      }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    book={},
    pronounce=0,
    translationInfo={},
  } = data || {}

  return {
    book,
    pronounce,
  }
}

export function serializeState(data) {
  return data
}
