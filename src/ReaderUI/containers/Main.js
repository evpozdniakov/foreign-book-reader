import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddBookForm from './AddBookForm'
import BookList from './BookList'
import Reader from './Reader'
import {
  _FORM,
  _LIST,
  _READER,
} from '../constants'

class Main extends Component {
  render() {
    return (
      <div>
        {this.renderForm()}
        {this.renderList()}
        {this.renderReader()}
      </div>
    )
  }

  renderForm() {
    const { mode } = this.props.internal

    if (mode !== _FORM) {
      return null
    }

    return <AddBookForm />
  }

  renderList() {
    const { mode } = this.props.internal

    if (mode !== _LIST) {
      return null
    }

    return <BookList />
  }

  renderReader() {
    const { mode } = this.props.internal

    if (mode !== _READER) {
      return null
    }

    return <Reader />
  }
}

export default connect(state => {
  const { internal } = state
  return {internal}
}, {
})(Main)
