import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddBookForm from './AddBookForm'

class Main extends Component {
  render() {
    return (
      <div>
        <AddBookForm />
      </div>
    )
  }
}

export default connect(state => {
  const { internal } = state
  return {internal}
}, {
})(Main)
