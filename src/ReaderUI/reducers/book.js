import {
  CHANGE,
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
