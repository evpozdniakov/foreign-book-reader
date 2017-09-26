import { combineReducers } from 'redux'
import internal from './internal'
import bookForm from './bookForm'
import list from './list'
import reader from './reader'

export default combineReducers({
  internal,
  bookForm,
  list,
  reader,
})
