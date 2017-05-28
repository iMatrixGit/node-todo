import React, { PropTypes, Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setInputValue, clearFormData } from '../actions/form';
import { signIn } from '../actions/authentication';
import { FormInput, Button } from '../components'

class LoginContainer extends Component {
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
        const { usernameInputValue, passwordInputValue } = this.props;
        const { signIn, clearFormData } = this.props;

        signIn({
            username: usernameInputValue,
            password: passwordInputValue
        });

        clearFormData();
    }

    render() {
        const { usernameInputValue, passwordInputValue } = this.props;

        return (
            <div>
                <h1>Login</h1>
                <FormInput
                    type="text"
                    name="loginUsername"
                    value={usernameInputValue}
                    placeholder="Enter username"
                    onChange={this.onChangeInputValue}
                />
                <FormInput
                    type="password"
                    name="loginPassword"
                    value={passwordInputValue}
                    placeholder="Enter password"
                    onChange={this.onChangeInputValue}
                />
                <Button text="Login" onClick={this.onSubmit} />
            </div>
        );
    }
}

LoginContainer.defaultProps = {
    'usernameInputValue': '',
    'passwordInputValue': '',
    'setInputValue': () => {},
    'clearFormData': () => {},
    'signUp': () => {}
};

LoginContainer.propTypes = {
    'usernameInputValue': PropTypes.string.isRequired,
    'passwordInputValue': PropTypes.string.isRequired,
    'setInputValue': PropTypes.func.isRequired,
    'clearFormData': PropTypes.func.isRequired
};

export default connect(
    state => ({
        usernameInputValue: state.form.get('loginUsername'),
        passwordInputValue: state.form.get('loginPassword')
    }),
    dispatch => bindActionCreators({
        setInputValue,
        clearFormData,
        signIn
    }, dispatch)
)(LoginContainer);