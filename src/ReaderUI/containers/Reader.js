import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { displayList } from '../actions/internal'
import { translateText } from '../actions/reader'
import '../style/Reader.less'

var propTypes
var selectionchangeTimer

if (NODE_ENV === 'development') {
  propTypes = {
    displayListAction: PropTypes.func.isRequired,
    translateTextAction: PropTypes.func.isRequired,
  }
}

class Reader extends Component {
  componentDidMount() {
    // document.addEventListener('selectionchange', this.handleSelectionChange.bind(this))
    this.bookCtnr.addEventListener('mouseup', this.handleMousup.bind(this))
  }

  componentWillUnmount() {
    // document.removeEventListener('selectionchange', this.handleSelectionChange.bind(this))
    this.bookCtnr.removeEventListener('mouseup', this.handleMousup.bind(this))
  }

  get bookCtnr() {
    return document.querySelector('.book-ctnr')
  }

  handleMousup() {
    if (selectionchangeTimer) {
      clearTimeout(selectionchangeTimer)
    }

    this.modifySelection()
    this.translateSelectedText()
  }

  handleSelectionChange() {
    if (selectionchangeTimer) {
      clearTimeout(selectionchangeTimer)
    }

    selectionchangeTimer = setTimeout(this.modifySelection, 500)
  }

  modifySelection() {
    const so = window.getSelection()

    const {
      anchorNode,
      anchorOffset,
      focusNode,
      focusOffset,
    } = so

    if (!anchorNode) {
      return
    }

    if (anchorNode !== focusNode) {
      return
    }

    const text = anchorNode.textContent
    const isL2R = anchorOffset <= focusOffset
    const selectionStartsAt = Math.min(anchorOffset, focusOffset)
    const selectionEndsAt = Math.max(anchorOffset, focusOffset)
    const indexOfSpaceBefore = text.lastIndexOf(' ', selectionStartsAt)
    const spaceBefore = indexOfSpaceBefore < 0 ? 0 : indexOfSpaceBefore
    const indexOfSpaceAfter = text.indexOf(' ', selectionEndsAt)
    const spaceAfter = indexOfSpaceAfter < 0 ? text.length :indexOfSpaceAfter
    const durtyPartBefore = text.substring(spaceBefore, selectionStartsAt)
    const durtyPartAfter = text.substring(selectionEndsAt, spaceAfter)
    const partBeforeMatch = /\W?(\w+)$/.exec(durtyPartBefore)
    const partBefore = partBeforeMatch ? partBeforeMatch[1] : ''
    const middlePart = text.substring(selectionStartsAt, selectionEndsAt)
    const partAfterMatch = /^(\w+)\W?/.exec(durtyPartAfter)
    const partAfter = partAfterMatch ? partAfterMatch[1] : ''

    if (!partAfter && !partBefore) {
      return
    }

    const range = so.getRangeAt(0)

    if (partBefore) {
      range.setStart(anchorNode, selectionStartsAt - partBefore.length)
    }

    if (partAfter) {
      range.setEnd(anchorNode, selectionEndsAt + partAfter.length)
    }
  }

  translateSelectedText() {
    const text = window.getSelection().toString()

    if (text) {
      this.props.translateTextAction(text)
    }
  }

  render() {
    return (
      <div className="reader">
        <div className="main-ctnr">
          {this.renderBackLink()}
          {this.renderBook()}
        </div>
        <aside className="definition-ctnr">
          {this.renderDefinition()}
        </aside>
      </div>
    )
  }

  renderBackLink() {
    const { displayListAction } = this.props

    return (
      <div className="controls">
        <button onClick={displayListAction}>⬅ Назад</button>
      </div>
    )
  }

  renderBook() {
    const {
      title,
      original,
    } = this.props.reader.book

    return (
      <div className="book-ctnr">
        <h1 className="book-title">{title}</h1>
        <div className="book-text">{original}</div>
      </div>
    );
  }

  renderDefinition() {
    const { reader } = this.props
    const { isTranslating, text, error } = reader

    var { translatedText } = reader

    if (isTranslating) {
      translatedText = '...'
    }
    else if (error) {
      translatedText = 'TRANSLATION ERROR'
    }

    return (
      <div className="translation-ctnr">
        <div className="text">{text}</div>
        <div className="translatedText">{translatedText}</div>
      </div>
    )
  }
}

export default connect(state => {
  const { reader } = state
  return {reader}
}, {
  displayListAction: displayList,
  translateTextAction: translateText,
})(Reader)
