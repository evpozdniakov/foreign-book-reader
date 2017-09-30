import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/BookList.less'
import { openReader, displayBookForm } from '../actions/internal'

class BookList extends Component {
  curryOpenReader(id) {
    return () => {
      this.props.openReaderAction(id)
    }
  }

  render() {
    return (
      <div className="book-list-ctnr">
        {this.renderAddButton()}
        {this.renderBookLinks()}
      </div>
    )
  }

  renderAddButton() {
    return <button onClick={this.props.displayBookFormAction}>Добавить книгу</button>
  }

  renderBookLinks() {
    const { items } = this.props.books

    return (
      <div className="book-list">
        <ul>
          {items.map(this.renderLinkToBook.bind(this))}
        </ul>
      </div>
    )
  }

  renderLinkToBook(book) {
    const props = {
      href: 'javascript:;',
      onClick: this.curryOpenReader(book.id),
    }

    return (
      <li key={book.id}>
        <a {...props}>
          {book.title}
        </a>
      </li>
    )
  }
}

export default connect(state => {
  const { books } = state
  return {books}
}, {
  openReaderAction: openReader,
  displayBookFormAction: displayBookForm,
})(BookList)
