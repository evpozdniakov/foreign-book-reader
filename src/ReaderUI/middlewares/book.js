import { changeTitle } from '../actions/book'


export function makeTitleFromTextIfNeeded(store) {
  const { title, original } = store.getState().book

  if (title.length) {
    return
  }

  if (original.length < 100) {
    return
  }

  const _title = original.substr(0, 40) + '…'

  store.dispatch(changeTitle(_title))
}
