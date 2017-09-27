import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { displayList } from '../actions/internal'
import '../style/Reader.less'

var propTypes
var selectionchangeTimer

if (NODE_ENV === 'development') {
  propTypes = {
    displayListAction: PropTypes.func.isRequired,
  }
}

class Reader extends Component {
  componentDidMount() {
    document.addEventListener('selectionchange', this.handleSelectionChange.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('selectionchange', this.handleSelectionChange.bind(this));
  }

  handleSelectionChange() {
    if (selectionchangeTimer) {
      clearTimeout(selectionchangeTimer)
    }

    selectionchangeTimer = setTimeout(this.modifySelection, 200)
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
    const selectionStartsAt = Math.min(anchorOffset, focusOffset)
    const selectionEndsAt = Math.max(anchorOffset, focusOffset)

    var spaceBefore = text.lastIndexOf(' ', selectionStartsAt)

    if (spaceBefore < 0) {
      spaceBefore = 0
    }

    var spaceAfter = text.indexOf(' ', selectionEndsAt)

    if (spaceAfter < 0) {
      spaceAfter = text.length
    }

    const durtyPartBefore = text.substring(spaceBefore, selectionStartsAt)
    const durtyPartAfter = text.substring(selectionEndsAt, spaceAfter)
    const partBeforeMatch = /\W?(\w+)$/.exec(durtyPartBefore)
    const partBefore = partBeforeMatch ? partBeforeMatch[1] : ''
    const middlePart = text.substring(selectionStartsAt, selectionEndsAt)
    const partAfterMatch = /^(\w+)\W?/.exec(durtyPartAfter)
    const partAfter = partAfterMatch ? partAfterMatch[1] : ''

    if (!partBefore && !partAfter) {
      return
    }

    const newSelectonStart = selectionStartsAt - partBefore.length
    const newSelectionEnd = selectionEndsAt + partAfter.length
    const range = so.getRangeAt(0)

    if (newSelectonStart < selectionStartsAt) {
      range.setStart(anchorNode, newSelectonStart)
    }

    if (newSelectionEnd > selectionEndsAt) {
      range.setEnd(anchorNode, newSelectionEnd)
    }
  }

  render() {
    const {
      title,
      original,
    } = this.props.reader.book

    return (
      <div className="reader">
        {this.renderBackLink()}
        <h1 className="book-title">{title}</h1>
        <div className="book-text">{original}</div>
      </div>
    )
  }

  renderBackLink() {
    const { displayListAction } = this.props

    return (
      <div className="controls">
        <button onClick={displayListAction}>⬅ Menu</button>
      </div>
    )
  }
}

export default connect(state => {
  const { reader } = state
  return {reader}
}, {
  displayListAction: displayList,
})(Reader)
