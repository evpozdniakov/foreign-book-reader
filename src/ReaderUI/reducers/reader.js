import {
  OPEN,
  _READER,
} from '../constants'

export default (state={}, action) => {
  const { type, data } = action

  switch (type) {
    case OPEN + _READER:
      return {
        ...state,
        book: data.book,
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
