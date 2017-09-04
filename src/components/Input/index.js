import React, { Component } from 'react';
import PropTypes from 'prop-types';

var propTypes;
if (NODE_ENV === 'development') {
  propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    type: PropTypes.string, // default text
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
}

export default class Input extends Component {
  static propTypes = propTypes;

  state = {
    hasFocus: false,
  };

  curryFocus() {
    return () => {
      const { onFocus } = this.props;

      this.setState({hasFocus: true});

      if (onFocus) {
        onFocus();
      }
    };
  }

  curryBlur() {
    return () => {
      const { onBlur } = this.props;

      this.setState({hasFocus: false});

      if (onBlur) {
        onBlur();
      }
    };
  }

  curryChange() {
    return () => {
      const { onChange } = this.props;
      const { value } = this.refs.inpt;

      if (!value.length) {
        setTimeout(() => {
          this.refs.inpt.value = '';
        }, 0);
      }

      if (onChange) {
        onChange(value);
      }
    };
  }

  currySubmit() {
    return ev => {
      const { onEnter } = this.props;

      if (onEnter && ev.keyCode === $.ui.keyCode.ENTER) {
        onEnter(this.refs.inpt.value, ev.nativeEvent);
      }
    };
  }

  render() {
    const { hasFocus } = this.state;
    const originalProps = {...this.props};

    const {
      className='',
      type='text',
      value,
    } = originalProps;

    delete originalProps.onEnter;

    const props = {
      ...originalProps,
      type,
      className: `rct-input ${hasFocus ? 'has-focus' : ''} ${className}`,
      value,
      ref: 'inpt',
      onFocus: this.curryFocus(),
      onBlur: this.curryBlur(),
      onChange: this.curryChange(),
      onKeyDown: this.currySubmit(),
    };

    delete props.onEnter;

    return <input {...props} />;
  }
}