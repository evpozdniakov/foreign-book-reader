import {
  OPEN,
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
      }

    case TRANSLATE + _TEXT + _START:
      return {
        ...state,
        isTranslating: true,
        error: null,
        text: data.text,
      }

    case TRANSLATE + _TEXT + _DONE:
      return {
        ...state,
        isTranslating: false,
        translatedText: response,
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
    book={}
  } = data || {}

  return {
    book,
  }
}

export function serializeState(data) {
  return data
}
