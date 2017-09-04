import { combineReducers } from 'redux'
import internal from './internal'
import book from './book'

export default combineReducers({
  internal,
  book,
})
