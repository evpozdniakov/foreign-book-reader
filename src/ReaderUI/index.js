import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Main from './containers/Main'

class App extends Component {
  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default App
