import { combineReducers } from 'redux'
import internal from './internal'
import bookForm from './bookForm'
import books from './books'
import reader from './reader'

export default combineReducers({
  internal,
  bookForm,
  books,
  reader,
})
