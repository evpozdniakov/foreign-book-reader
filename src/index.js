import React from 'react'
import ReactDOM from 'react-dom'
import App from './ReaderUI'
import md5 from 'md5'
import { makeStore, serializeAppState } from './ReaderUI/store'

var appStateMD5
var originalsMD5 = {}

const LOCAL_STORAGE = {
  APP_STATE: 'app-state',
  ORIGINAL_KEY_START: 'original-',
}

const store = makeStore(readStateFromLocalStorage())
const app = <App store={store} />
const ctnr = document.getElementById('root')

ReactDOM.render(app, ctnr)

store.subscribe(saveStateInLocalStorage)

function saveStateInLocalStorage() {
  if (!localStorage) {
    return
  }

  const state = store.getState()

  storeAppStateLocally(state)
  storeOriginalsLocally(state)
}

function storeAppStateLocally(state) {
  const prevAppStateMD5 = appStateMD5
  const appState = serializeAppState(state)
  const appStateJsonString = JSON.stringify(appState)

  appStateMD5 = md5(appStateJsonString)

  if (prevAppStateMD5 === appStateMD5) {
    return
  }

  localStorage.setItem(LOCAL_STORAGE.APP_STATE, JSON.stringify(appState))
}

function storeOriginalsLocally(state) {
  const { books } = state.list
  const ids = books.map(book => book.id)

  Object.keys(originalsMD5).forEach(id => {
    if (ids.includes(id)) {
      return
    }

    localStorage.removeItem(getOriginalKey(id))
  })

  books.forEach(book => {
    const { id, original } = book

    if (originalsMD5[id] === JSON.stringify(original)) {
      return
    }

    localStorage.setItem(getOriginalKey(id), original)
  })
}

function readStateFromLocalStorage() {
  if (!localStorage) {
    return {}
  }

  const appStateJsonString = localStorage.getItem(LOCAL_STORAGE.APP_STATE)

  if (!appStateJsonString) {
    return {}
  }

  const state = JSON.parse(appStateJsonString)

  state.list.books.forEach(book => {
    const { id } = book

    book.original = localStorage.getItem(getOriginalKey(id))
  })

  return state
}

function getOriginalKey(id) {
  return LOCAL_STORAGE.ORIGINAL_KEY_START + id
}
