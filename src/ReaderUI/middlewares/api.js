import {
  ADD,
  CHANGE,
  _BOOK,
  _ORIGINAL,
} from '../constants'

import { makeTitleFromTextIfNeeded } from './book'
import { tryDisplayBookList } from './internal'

export default store => next => action => {
  const { type } = action

  switch (type) {
    case CHANGE + _ORIGINAL: {
      next(action);
      makeTitleFromTextIfNeeded(store)
      break
    }

    case ADD + _BOOK: {
      next(action)
      tryDisplayBookList(store)
      break
    }

    default:
      next(action);
  }
}
