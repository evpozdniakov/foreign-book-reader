import {
  ADD,
  CHANGE,
  OPEN,
  PRONOUNCE,
  TRANSLATE,
  _BOOK,
  _ORIGINAL,
  _READER,
  _TEXT,
} from '../constants'

import { makeTitleFromTextIfNeeded } from './bookForm'
import { handleAddBook } from './books'
import { handleOpenReader, handlePronounce, handleTranslateText } from './reader'

export default store => next => action => {
  const { type } = action

  switch (type) {
    case CHANGE + _ORIGINAL: {
      next(action)
      makeTitleFromTextIfNeeded(store)
      break
    }

    case ADD + _BOOK: {
      handleAddBook(store, next, action)
      break
    }

    case OPEN + _READER: {
      handleOpenReader(store, next, action)
      break
    }

    case PRONOUNCE + _TEXT: {
      handlePronounce(store, next, action)
      break
    }

    case TRANSLATE + _TEXT: {
      handleTranslateText(store, next, action)
      break
    }

    default:
      next(action)
  }
}
