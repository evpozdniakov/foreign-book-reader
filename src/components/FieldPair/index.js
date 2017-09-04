import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

export const LAYOUT = {
	VERTICAL: 'vrt',
	HORIZONTAL: 'hrz',
};

var propTypes;

if (NODE_ENV === 'development') {
	propTypes = {
		afterLabel: PropTypes.element,
		layout: PropTypes.oneOf([LAYOUT.VERTICAL, LAYOUT.HORIZONTAL]), // vertical by default
		label: PropTypes.any,
		totalResults: PropTypes.number,
		description: PropTypes.string,
		required: PropTypes.bool,
		children: function() {
			const elm = PropTypes.element;
			const err1 = elm(...arguments);
			const err2 = PropTypes.arrayOf(elm)(...arguments);

			return err1 && err2 || null;
		},
	};
}

export default class FieldPair extends Component {
	static propTypes = propTypes;

	render() {
		const {
			className: origClassName='',
			layout=LAYOUT.VERTICAL,
			style,
		} = this.props;

		const className = `field-pair ${origClassName} layout-${layout}`;

		return (
			<div className={className} style={style}>
				{this.renderLabel()}
				{this.renderFieldValue()}
			</div>
		);
	}

	renderLabel() {
		const { required } = this.props;
		const className = `label ${required ? 'required' : ''}`;

		return (
			<div className={className}>
				{this.renderTitle()}
				{this.renderDescription()}
			</div>
		);
	}

	renderTitle() {
		const {
			label,
		} = this.props;

		const labelText = label;

		return (
			<div className="title">
				<h5>{labelText}</h5>
				{this.renderTotalResults()}
				{this.renderAfterLabel()}
			</div>
		);
	}

	renderDescription() {
		const { description } = this.props;

		if (!description) {
			return null;
		}

		return (
			<div className="description">
				{description}
			</div>
		);
	}

	renderTotalResults() {
		const { totalResults } = this.props;

		if (isNaN(totalResults)) {
			return null;
		}

		return (
			<span className="total-results">
				{totalResults}
			</span>
		);
	}

	renderAfterLabel() {
		const { afterLabel } = this.props;

		if (!afterLabel) {
			return null;
		}

		return (
			<span className="after-label">
				{afterLabel}
			</span>
		);
	}

	renderFieldValue() {
		const { children } = this.props;

		if (!children) {
			return null;
		}

		return (
			<div className="fld-val">
				{children}
			</div>
		);
	}
}