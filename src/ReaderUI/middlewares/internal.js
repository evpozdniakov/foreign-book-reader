import { displayList } from '../actions/internal'

export function handleAddBook(store, next, action) {
  const { book } = store.getState()

  // TODO: validate book form

  const { type } = action

  next({
    type,
    data: {book},
  })

  store.dispatch(displayList())
}
