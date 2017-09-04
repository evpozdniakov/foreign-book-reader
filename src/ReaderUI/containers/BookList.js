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
    const { books } = this.props.list

    return (
      <div>{books.map(this.renderLinkToBook.bind(this))}</div>
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
  const { list } = state
  return {list}
}, {
  openReaderAction: openReader
})(BookList)
