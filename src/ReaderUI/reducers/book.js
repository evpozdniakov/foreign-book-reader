import {
  CHANGE,
  _TITLE,
  _ORIGINAL,
} from '../constants'

export default (state={}, action) => {
  const { type, data } = action

  switch (type) {
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
    original='',
  } = data || {}

  return {
    original,
  }
}
