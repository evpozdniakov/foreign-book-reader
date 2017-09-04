import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

var propTypes;

if (NODE_ENV === 'development') {
  propTypes = {
    accept: PropTypes.string, // optional, default '*'
    onFileChange: PropTypes.func.isRequired, // returns path to file (null if no file selected)
    onFileReadAsDataURL: PropTypes.func, // returns file content encoded into base64 (null if no file selected),
    disabled: PropTypes.bool
  };
}


class InputFile extends Component {
  static propTypes = propTypes;

  state = {
    left: 0,
    top: 0,
    fileName: null,
  };

  curryChangeFile() {
    return ev => {
      const input = ev.target;
      const path2file = input.value;
      const { onFileChange, onFileReadAsDataURL } = this.props;
      const fileName = path2file ? path2file.split('\\').pop() : null;

      this.setState({fileName});
      onFileChange(path2file || null);

      if (!onFileReadAsDataURL) {
        return;
      }

      if (!path2file) {
        onFileReadAsDataURL(null);
        return;
      }

      const reader = new FileReader();

      reader.addEventListener('load', () => {
        onFileReadAsDataURL(reader.result);
      }, false);

      reader.readAsDataURL(input.files[0]);
    };
  }

  curryMouseMove() {
    return ev => {
      const { ctnr, inpt } = this.refs;
      const offsetL = ctnr.offsetLeft;
      const offsetT = ctnr.offsetTop;
      const top = ev.pageY - offsetT - (inpt.offsetHeight / 2);
      const left = ev.pageX - offsetL - (inpt.offsetWidth * 0.95);

      this.setState({top, left});
    };
  }

  render() {
    const { accept='*', disabled } = this.props;
    const { left, top, fileName } = this.state;

    const props = {
      type: 'file',
      accept,
      onChange: this.curryChangeFile(),
      style: {left, top},
      disabled
    };

    return (
      <div ref="ctnr" className="react-input-file" onMouseMove={this.curryMouseMove()}>
        <input ref="inpt" {...props} />
        <span>{fileName || '\u00a0'}</span>
        <button>…</button>
      </div>
    );
  }
}

export default InputFile;