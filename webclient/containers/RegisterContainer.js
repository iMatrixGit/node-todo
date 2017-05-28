import React, { PropTypes, Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setInputValue, clearFormData } from '../actions/form';
import { signUp } from '../actions/authentication';
import { FormInput, Button } from '../components'

class RegisterContainer extends Component {
    constructor() {
        super();

        this.onChangeInputValue = this.onChangeInputValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillUnmount() {
        const { clearFormData } = this.props;

        clearFormData();
    }

    onChangeInputValue({ name, value }) {
        const { setInputValue } = this.props;

        setInputValue({ name, value });
    }

    onSubmit() {
        const { emailInputValue, usernameInputValue, passwordInputValue } = this.props;
        const { signUp, clearFormData } = this.props;

        signUp({
            email: emailInputValue,
            username: usernameInputValue,
            password: passwordInputValue
        });

        clearFormData();

    }

    render() {
        const { emailInputValue, usernameInputValue, passwordInputValue } = this.props;

        return (
            <div>
                <h1>Register</h1>
                <FormInput
                    type="email"
                    name="registerEmail"
                    value={emailInputValue}
                    placeholder="Enter email"
                    onChange={this.onChangeInputValue}
                />
                <FormInput
                    type="text"
                    name="registerUsername"
                    value={usernameInputValue}
                    placeholder="Enter username"
                    onChange={this.onChangeInputValue}
                />
                <FormInput
                    type="password"
                    name="registerPassword"
                    value={passwordInputValue}
                    placeholder="Enter password"
                    onChange={this.onChangeInputValue}
                />
                <Button text="Register" onClick={this.onSubmit} />
            </div>
        );
    }
}

RegisterContainer.defaultProps = {
    'emailInputValue': '',
    'usernameInputValue': '',
    'passwordInputValue': '',
    'setInputValue': () => {},
    'clearFormData': () => {},
    'signUp': () => {}
};

RegisterContainer.propTypes = {
    'emailInputValue': PropTypes.string.isRequired,
    'usernameInputValue': PropTypes.string.isRequired,
    'passwordInputValue': PropTypes.string.isRequired,
    'setInputValue': PropTypes.func.isRequired,
    'clearFormData': PropTypes.func.isRequired
};

export default connect(
    state => ({
        emailInputValue: state.form.getIn(['registerEmail']),
        usernameInputValue: state.form.getIn(['registerUsername']),
        passwordInputValue: state.form.getIn(['registerPassword'])
    }),
    dispatch => bindActionCreators({
        setInputValue,
        clearFormData,
        signUp
    }, dispatch)
)(RegisterContainer);