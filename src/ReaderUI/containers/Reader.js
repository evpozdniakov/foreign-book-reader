import React, { Component } from 'react'
import { connect } from 'react-redux'

class Reader extends Component {
  render() {
    const {
      title,
      original,
    } = this.props.reader.book

    return (
      <div>
        <h1>{title}</h1>
        {original}
      </div>
    )
  }
}

export default connect(state => {
  const { reader } = state
  return {reader}
}, {
})(Reader)
