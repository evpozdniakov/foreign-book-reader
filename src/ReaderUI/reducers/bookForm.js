import {
  ADD,
  CHANGE,
  _BOOK,
  _TITLE,
  _ORIGINAL,
} from '../constants'

export default (state={}, action) => {
  const { type, data } = action

  switch (type) {
    case ADD + _BOOK:
      return {
        ...state,
        original: '',
        title: '',
      }

    case CHANGE + _ORIGINAL:
      return {
        ...state,
        original: data.original,
      }

    case CHANGE + _TITLE:
      return {
        ...state,
        title: data.title,
      }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    title='',
    original='',
  } = data || {}

  return {
    title,
    original,
  }
}

export function serializeState(data) {
  return data
}
