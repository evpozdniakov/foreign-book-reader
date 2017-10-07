import { API_KEY } from '../../../api-key'
import {
  _START, _DONE, _FAIL,
} from '../constants'

import { pronounceText } from '../actions/reader'

export function handleOpenReader(store, next, action) {
  const { type, data } = action
  const { bookId } = data
  const { books } = store.getState()
  const book = books.items.find(item => item.id === bookId)

  next({
    type,
    data: {book},
  })
}

export function handleTranslateText(store, next, action) {
  const { type, data } = action

  next({
    ...action,
    type: type + _START,
  })

  const text = encodeURIComponent(data.text)
  const url = `/translate/${text}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      next({
        ...action,
        type: type + _DONE,
        response: data,
      })
    })
    .catch(error => {
      next({
        ...action,
        type: type + _FAIL,
        error,
      })
    })
}

export function handlePronounce(store, next, action) {
  next(action)

  const { pronounce } = store.getState().reader

  if (pronounce % 2 === 0) {
    setTimeout(() => {
      store.dispatch(pronounceText())
    }, 0)
  }
}
