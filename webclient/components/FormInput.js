import React, { Component, PropTypes } from 'react';
import { noop } from 'underscore';

export default class FormInput extends Component {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { name, onChange } = this.props;

        onChange({ event, name, value: e.target.value });
    }

    render() {
        const { name, type, value, placeholder } = this.props;

        return (
            <input
                className="form-input"
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={this.onChange}
            />
        );
    }
}

FormInput.defaultProps = {
    'name': 'defaultInput',
    'type': 'text',
    'value': '',
    'onChange': noop
};

FormInput.propTypes = {
    'name': PropTypes.string.isRequired,
    'type': PropTypes.string.isRequired,
    'value': PropTypes.string.isRequired,
    'placeholder': PropTypes.string,
    'onChange': PropTypes.function
};