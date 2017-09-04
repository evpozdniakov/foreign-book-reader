import React, { Component } from 'react';
import PropTypes from 'prop-types';

var propTypes;

if (NODE_ENV === 'development') {
	propTypes = {
		disabled: PropTypes.bool,
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		placeholder: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

export default class Textarea extends Component {
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

	curryChange() {
		return () => {
			const { onChange } = this.props;

			if (onChange) {
				onChange(this.refs.txtr.value);
			}
		};
	}

	curryBlur() {
		return () => {
			const { onBlur } = this.props;

			this.setState({hasFocus: false});

			if (onBlur) {
				onBlur(this.refs.txtr.value);
			}
		};
	}

	render() {
		const { hasFocus } = this.state;
		const originalProps = {...this.props};

		const {
			value,
			className='',
		} = originalProps;

		const props = {
			...originalProps,
			className: `rct-textarea ${hasFocus ? 'has-focus' : ''} ${className}`,
			value,
			ref: 'txtr',
			onFocus: this.curryFocus(),
			onChange: this.curryChange(),
			onBlur: this.curryBlur(),
		};

		return <textarea {...props} />;
	}
}