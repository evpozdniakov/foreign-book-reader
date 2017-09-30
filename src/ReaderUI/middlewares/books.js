import { getRandomHash } from 'lib/utils'
import { displayList } from '../actions/internal'

export function handleAddBook(store, next, action) {
  const book = store.getState().bookForm

  book.id = getRandomHash()

  // TODO: validate book form

  const { type } = action

  next({
    type,
    data: {book},
  })

  store.dispatch(displayList())
}
