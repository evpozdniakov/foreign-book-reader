import { getRandomHash } from 'lib/utils'
import { displayList } from '../actions/internal'

export function handleAddBook(store, next, action) {
  const { book } = store.getState()

  book.id = getRandomHash()
  console.log('--- ', book.id)

  // TODO: validate book form

  const { type } = action

  next({
    type,
    data: {book},
  })

  store.dispatch(displayList())
}
