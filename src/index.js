import React from 'react'
import ReactDOM from 'react-dom'
import App from './ReaderUI'
import makeStore from './ReaderUI/store'

const store = makeStore()
const app = <App store={store} />
const ctnr = document.getElementById('root')

ReactDOM.render(app, ctnr)
