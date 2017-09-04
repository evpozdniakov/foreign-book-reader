import {
  CHANGE,
  _ORIGINAL,
} from '../constants'

import { makeTitleFromTextIfNeeded } from './book'

export default store => next => action => {
  const { type } = action

  switch (type) {
    case CHANGE + _ORIGINAL: {
      next(action);
      makeTitleFromTextIfNeeded(store)
      break
    }

    default:
      next(action);
  }
}
