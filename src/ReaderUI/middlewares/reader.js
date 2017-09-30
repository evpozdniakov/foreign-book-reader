import { API_KEY } from '../../../api-key'
import {
  _START, _DONE, _FAIL,
} from '../constants'

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
  const url = 'https://translation.googleapis.com/language/translate/v2'
  + `?key=${API_KEY.GOOGLE_TRANSLATE}`
  + `&source=en&target=ru&q=${text}&format=text&model=nmt`

  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { translations=[] } = res.data || {}
      const { translatedText } = translations[0] || {}

      next({
        ...action,
        type: type + _DONE,
        response: translatedText,
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