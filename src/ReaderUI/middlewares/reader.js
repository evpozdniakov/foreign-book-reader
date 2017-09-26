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
