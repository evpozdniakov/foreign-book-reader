import React, { Component } from 'react'
import { connect } from 'react-redux'
import FieldPair from 'components/FieldPair'
import InputFile from 'components/InputFile'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import './style.css'
import {
  changeTitle,
  changeOriginal,
} from '../../actions/book'

class AddBookForm extends Component {
  render() {
    return (
      <div>
        {this.renderTitleField()}
        {this.renderOriginalField()}
        {this.renderUploadTranslation()}
      </div>
    )
  }

  renderTitleField() {
    const {
      book: { title },
      changeTitleAction,
    } = this.props

    const props = {
      value: title,
      onChange: changeTitleAction,
    }

    return (
      <FieldPair label="Название книги">
        <Input {...props} />
      </FieldPair>
    )
  }

  renderOriginalField() {
    const {
      book: { original },
      changeOriginalAction,
    } = this.props

    const props = {
      value: original,
      onChange: changeOriginalAction,
    }

    return (
      <FieldPair label="Текст книги">
        <Textarea {...props} />
      </FieldPair>
    )
  }

  renderUploadOriginal() {
    const props = {
      onFileChange: () => {}
    }

    return (
      <FieldPair required={true} label="Текст книги">
        <InputFile {...props} />
      </FieldPair>
    )
  }

  renderUploadTranslation() {
    const props = {
      onFileChange: () => {}
    }

    return (
      <FieldPair required={true} label="Перевод книги">
        <InputFile {...props} />
      </FieldPair>
    )
  }
}

export default connect(state => {
  const { internal, book } = state
  return {internal, book}
}, {
  changeOriginalAction: changeOriginal,
  changeTitleAction: changeTitle,
})(AddBookForm)
