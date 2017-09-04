import { displayList } from '../actions/internal'

export function tryDisplayBookList(store) {
  // TODO: validate book form
  store.dispatch(displayList())
}