import React, { Component } from 'react'
import { connect } from 'react-redux'

class BookList extends Component {
  render() {
    const { books } = this.props.list

    return (
      <div>{books.map(this.renderLinkToBook.bind(this))}</div>
    )
  }

  renderLinkToBook(book) {
    return (
      <div>
        <a>{book.title}</a>
      </div>
    )
  }
}

export default connect(state => {
  const { list } = state
  return {list}
}, {
})(BookList)
