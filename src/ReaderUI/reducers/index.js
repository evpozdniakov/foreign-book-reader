import { combineReducers } from 'redux'
import internal from './internal'
import book from './book'
import list from './list'
import reader from './reader'

export default combineReducers({
  internal,
  book,
  list,
  reader,
})
