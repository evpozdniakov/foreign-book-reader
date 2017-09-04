import React, { Component } from 'react'
import { connect } from 'react-redux'
import FieldPair from 'components/FieldPair'
import './style.css'

class AddBookForm extends Component {
  render() {
    return (
      <div>
        <FieldPair label="i am label">
          <p>I am field</p>
        </FieldPair>
      </div>
    )
  }
}

export default connect(state => {
  const { internal } = state
  return {internal}
}, {
})(AddBookForm)
