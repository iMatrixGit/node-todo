import React, { Component, PropTypes } from 'react';
import { noop } from 'underscore';
import classNames from 'classnames';

export default class Button extends Component {
    render() {
        const { type, text, className, disabled, onClick } = this.props;

        return (
            <button
                className={classNames('button', className)}
                type={type}
                disabled={disabled}
                onClick={onClick}
            >
                {text}
            </button>
        );
    }
}

Button.defaultProps = {
    'type': 'button',
    'text': 'Submit',
    'disabled': false,
    'onClick': noop
};

Button.propTypes = {
    'type': PropTypes.string.isRequired,
    'text': PropTypes.string.isRequired,
    'disabled': PropTypes.bool,
    'onClick': PropTypes.function,
    'className': PropTypes.string
};