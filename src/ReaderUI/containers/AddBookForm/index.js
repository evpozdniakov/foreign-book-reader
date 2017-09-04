import React, { Component } from 'react'
import { connect } from 'react-redux'
import FieldPair from 'components/FieldPair'
import InputFile from 'components/InputFile'
import Input from 'components/Input'
import './style.css'

class AddBookForm extends Component {
  render() {
    return (
      <div>
        {this.renderTitleField()}
        {this.renderUploadOriginal()}
        {this.renderUploadTranslation()}
      </div>
    )
  }

  renderTitleField() {
    const props = {
      value: '',
      onChange: () => {},
    }

    return (
      <FieldPair label="Название книги">
        <Input {...props} />
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
  const { internal } = state
  return {internal}
}, {
})(AddBookForm)
