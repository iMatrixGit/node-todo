import React, { Component, PropTypes } from 'react';
import { FormInput, Button } from '.';

export default class AddTodoForm extends Component {
    constructor() {
        super();

        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        const { inputText: text, onSubmit } = this.props;

        onSubmit({ text, author: 'john.doe' });
    }

    onChangeText({ value }) {
        const { onChangeText } = this.props;

        onChangeText(value);
    }

    render() {
        const { inputText } = this.props;

        return (
            <div className="form">
                <FormInput
                    type="text"
                    value={inputText}
                    onChange={this.onChangeText}
                    placeholder="Enter todo"
                />
                <Button
                    text="Add todo"
                    disabled={inputText.length < 3}
                    onClick={this.onSubmit}
                />
            </div>
        );
    }
}

AddTodoForm.propTypes = {
    'inputText': PropTypes.string.isRequired,
    'onChangeText': PropTypes.func.isRequired,
    'onSubmit': PropTypes.func.isRequired
};