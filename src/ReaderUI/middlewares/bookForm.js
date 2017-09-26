import { changeTitle } from '../actions/bookForm'


export function makeTitleFromTextIfNeeded(store) {
  const { title, original } = store.getState().bookForm

  if (title.length) {
    return
  }

  if (original.length < 100) {
    return
  }

  const _title = original.substr(0, 40) + '…'

  store.dispatch(changeTitle(_title))
}
