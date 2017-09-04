import React, { Component } from 'react'
import { connect } from 'react-redux'

class BookList extends Component {
  render() {
    return <div>list</div>
  }
}

export default connect(state => {
  const { internal } = state
  return {internal}
}, {
})(BookList)
