import {
  DISPLAY,
  _FORM,
  _LIST,
} from '../constants'

export default (state={}, action) => {
  const { type } = action

  switch (type) {
    case DISPLAY + _LIST:
      return {
        ...state,
        mode: _LIST,
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
