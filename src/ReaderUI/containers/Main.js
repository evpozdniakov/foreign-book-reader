import React, { Component } from 'react'
import { connect } from 'react-redux'

class Main extends Component {
  render() {
    return (
      <div>hi there main Component !</div>
    )
  }
}

export default connect(state => {
  const { internal } = state
  return {internal}
}, {
})(Main)
