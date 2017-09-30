import React, { Component } from 'react'
import { connect } from 'react-redux'
import FieldPair from 'components/FieldPair'
import InputFile from 'components/InputFile'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import '../style/AddBookForm.less'
import { displayList } from '../actions/internal'
import {
  addBook,
  changeTitle,
  changeOriginal,
} from '../actions/bookForm'

class AddBookForm extends Component {
  curryAddBook() {
    return ev => {
      this.props.addBookAction()
      ev.preventDefault()
    }
  }

  render() {
    return (
      <div className="book-form-ctnr">
        {this.renderBackLink()}
        {this.renderForm()}
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

  renderForm() {
    return (
      <form className="add-book-form" onSubmit={this.curryAddBook()}>
        {this.renderTitleField()}
        {this.renderOriginalField()}
        {this.renderUploadTranslation()}
        {this.renderSaveButton()}
      </form>
    )
  }

  renderTitleField() {
    const {
      bookForm: { title },
      changeTitleAction,
    } = this.props

    const props = {
      value: title,
      onChange: changeTitleAction,
    }

    return (
      <FieldPair label="Название книги">
        <Input className="title-field" {...props} />
      </FieldPair>
    )
  }

  renderOriginalField() {
    const {
      bookForm: { original },
      changeOriginalAction,
    } = this.props

    const props = {
      value: original,
      onChange: changeOriginalAction,
    }

    return (
      <FieldPair label="Текст книги">
        <Textarea className="original-text-field" {...props} />
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
    return null;
    /*const props = {
      onFileChange: () => {}
    }

    return (
      <FieldPair required={true} label="Перевод книги">
        <InputFile {...props} />
      </FieldPair>
    )*/
  }

  renderSaveButton() {
    return (
      <div className="paragraph">
        <button type="submit">Добавить</button>
      </div>
    )
  }
}

export default connect(state => {
  const { bookForm, books } = state
  return {bookForm, books}
}, {
  addBookAction: addBook,
  changeOriginalAction: changeOriginal,
  changeTitleAction: changeTitle,
  displayListAction: displayList,
})(AddBookForm)
