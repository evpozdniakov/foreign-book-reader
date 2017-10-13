import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { displayList } from '../actions/internal'
import { pronounceText, translateText } from '../actions/reader'
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

  get translationInfo() {
    return this.props.reader.translationInfo
  }

  get isTranslating() {
    return this.props.reader.isTranslating
  }

  curryPronounceText() {
    return () => {
      this.props.pronounceTextAction()
    }
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
    const partBeforeMatch = /\W?([a-zàâçéèêëîïôûùüÿñæœ]+)$/i.exec(durtyPartBefore)
    const partBefore = partBeforeMatch ? partBeforeMatch[1] : ''
    const middlePart = text.substring(selectionStartsAt, selectionEndsAt)
    const partAfterMatch = /^([a-zàâçéèêëîïôûùüÿñæœ]+)\W?/i.exec(durtyPartAfter)
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
    const selection = window.getSelection().toString()
    const text = cleanupSelection(selection)

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
      <div className="book-ctnr scroll-ctnr">
        <h1 className="book-title">{title}</h1>
        <div className="book-text">{original}</div>
      </div>
    );
  }

  renderDefinition() {
    return (
      <div className="scroll-ctnr">
        {this.renderTranslatingText()}
        {this.renderTranscription()}
        {this.renderAudioIframe()}
        {this.renderDefinitionGroups()}
      </div>
    )
  }

  renderTranslatingText() {
    const { translatingText } = this.props.reader

    if (!translatingText) {
      return null
    }

    if (this.isTranslating) {
      return (
        <div className="text">
          {translatingText}
          <br/>
          {'...'}
        </div>
      )
    }

    const { transcription, word } = this.translationInfo

    if (translatingText === word) {
      return (
        <div className="text">
          {translatingText}
          {transcription ? null : this.renderSpeakerButton()}
        </div>
      )
    }

    return (
      <div>
        <div className="text not-found">{translatingText}</div>
        <div className="text">
          {word}
          {transcription ? null : this.renderSpeakerButton()}
        </div>
      </div>
    )
  }

  renderSpeakerButton() {
    return (
      <button className="tts-button" onClick={this.curryPronounceText()}>
        🔈
      </button>
    )
  }

  renderTranscription() {
    if (this.isTranslating) {
      return null
    }

    const { text } = this.props.reader
    const { transcription, word } = this.translationInfo || {}

    if (!transcription) {
      return null
    }

    return (
      <div className="transcription">
        {transcription}
        {this.renderSpeakerButton(word)}
      </div>
    )
  }

  renderAudioIframe() {
    if (this.isTranslating) {
      return null
    }

    const { word } = this.translationInfo || {}

    if (!word) {
      return null
    }

    const { pronounce } = this.props.reader

    if (pronounce % 2 === 0) {
      return null
    }

    const src = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=en&q=${encodeURIComponent(word)}`

    return (
      <div className="audio-iframe">
        <iframe src={src} width="1" height="1" />
      </div>
    )
  }

  renderDefinitionGroups() {
    if (this.isTranslating) {
      return null
    }

    const { definitions } = this.translationInfo || {}

    if (!definitions) {
      return null
    }

    return (
      <div className="definitions">
        {definitions.map(this.renderDefinitionGroup.bind(this))}
      </div>
    )
  }

  renderDefinitionGroup(group, index) {
    const { notype, type, variants } = group
    const groupKey = `definition-group-${index}`

    if (notype) {
      return <div key={groupKey} className="no-type">{notype.join(' / ')}</div>
    }

    const dtdd = variants.reduce((res, item, index) => {
      return res.concat([
        <dt key={`dt-${index}`}><i>{item.translation}</i></dt>,
        <dd key={`dd-${index}`}>{item.backTranslations}</dd>,
      ])
    }, [])

    return (
      <section key={groupKey} className="definition-group">
        <header>{type}</header>
        <dl>
          {dtdd}
        </dl>
      </section>
    )
  }
}

export default connect(state => {
  const { reader } = state
  return {reader}
}, {
  displayListAction: displayList,
  pronounceTextAction: pronounceText,
  translateTextAction: translateText,
})(Reader)

function cleanupSelection(text) {
  return text.split('’').join('\'')
}
