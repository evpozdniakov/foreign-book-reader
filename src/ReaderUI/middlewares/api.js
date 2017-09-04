import {
  ADD,
  CHANGE,
  _BOOK,
  _ORIGINAL,
} from '../constants'

import { makeTitleFromTextIfNeeded } from './book'
import { handleAddBook } from './internal'

export default store => next => action => {
  const { type } = action

  switch (type) {
    case CHANGE + _ORIGINAL: {
      next(action);
      makeTitleFromTextIfNeeded(store)
      break
    }

    case ADD + _BOOK: {
      handleAddBook(store, next, action)
      break
    }

    default:
      next(action);
  }
}
