import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openReader } from '../actions/internal'

class BookList extends Component {
  curryOpenReader(id) {
    return () => {
      this.props.openReaderAction(id)
    }
  }

  render() {
    const { items } = this.props.books

    return (
      <div>{items.map(this.renderLinkToBook.bind(this))}</div>
    )
  }

  renderLinkToBook(book) {
    const props = {
      href: 'javascript:;',
      onClick: this.curryOpenReader(book.id),
    }

    return (
      <div key={book.id}>
        <a {...props}>
          {book.title}
        </a>
      </div>
    )
  }
}

export default connect(state => {
  const { books } = state
  return {books}
}, {
  openReaderAction: openReader
})(BookList)
