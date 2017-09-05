export function handleOpenReader(store, next, action) {
  const { type, data } = action
  const { bookId } = data
  const { list } = store.getState()
  const book = list.books.find(item => item.id === bookId)

  next({
    type,
    data: {book},
  })
}
