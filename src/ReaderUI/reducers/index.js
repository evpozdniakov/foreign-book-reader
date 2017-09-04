import { combineReducers } from 'redux'
import internal from './internal'
import book from './book'
import list from './list'

export default combineReducers({
  internal,
  book,
  list,
})
