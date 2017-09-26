import {
  DISPLAY,
  OPEN,
  _FORM,
  _LIST,
  _READER,
} from '../constants'

export default (state={}, action) => {
  const { type, data } = action

  switch (type) {
    case DISPLAY + _LIST:
      return {
        ...state,
        mode: _LIST,
      }

    case OPEN + _READER:
      return {
        ...state,
        mode: _READER,
      }

    default:
      return state
  }
}

export function getInitState(data) {
  const {
    mode=_FORM
  } = data || {}

  return {
    mode,
  }
}

export function serializeState(data) {
  return data
}
