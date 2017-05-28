import React, { PropTypes, Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { noop } from 'underscore';
import { setInputValue, clearFormData } from '../actions/form';
import {
    joinChat,
    leaveChat,
    sendChatMessage
} from '../actions/chat';
import { FormInput, Button, ChatMessages } from '../components';

class ChatContainer extends Component {
    constructor() {
        super();

        this.onChangeInputValue = this.onChangeInputValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitMessage = this.onSubmitMessage.bind(this);
        this.renderUser = this.renderUser.bind(this);
    }

    componentWillMount() {
        const { joinChat } = this.props;

        const username = sessionStorage.getItem('username');

        if (username) {
            joinChat(username);
        }
    }

    componentWillUnmount() {
        const { leaveChat } = this.props;

        leaveChat();
    }

    onChangeInputValue({ name, value }) {
        const { setInputValue } = this.props;

        setInputValue({ name, value });
    }

    onSubmit() {
        const { usernameInputValue, joinChat } = this.props;

        joinChat(usernameInputValue);
    }

    onSubmitMessage() {
        const { username, messageInputValue, sendChatMessage, clearFormData } = this.props;

        sendChatMessage({ username, message: messageInputValue });
        clearFormData();
    }

    renderJoinForm() {
        const { usernameInputValue } = this.props;
        const isButtonDisabled = !usernameInputValue || usernameInputValue.length < 3;

        return (
            <div>
                <FormInput
                    type="text"
                    name="chatUsername"
                    value={usernameInputValue}
                    placeholder="Enter username"
                    onChange={this.onChangeInputValue}
                />
                <Button
                    text="Join"
                    onClick={this.onSubmit}
                    disabled={isButtonDisabled}
                />
            </div>
        )
    }

    renderUser(id, index) {
        const { username } = this.props;
        const color = username === id ? 'green' : 'black';

        return (
            <div
                key={index}
                style={{ color }}
            >{id}</div>
        );
    }

    renderList() {
        const { userIds } = this.props;

        return (
            <div>{ userIds.size && userIds.map(this.renderUser) }</div>
        )
    }

    renderChatWindow() {
        const { username, messages, messageInputValue } = this.props;

        return (
            <div>
                <h3>Chat messages</h3>
                <ChatMessages
                    username={username}
                    messages={messages}
                />
                <div>
                    <FormInput
                        type="text"
                        name="chatMessage"
                        value={messageInputValue}
                        placeholder="Enter message"
                        onChange={this.onChangeInputValue}
                    />
                    <Button
                        text="Send"
                        onClick={this.onSubmitMessage}
                        disabled={!messageInputValue}
                    />
                </div>
            </div>
        )
    }

    render() {
        const { userIds, messages } = this.props;

        return (
            <div>
                <h1>Chat users:</h1>
                { userIds.size ? this.renderList() : this.renderJoinForm() }
                { messages.size ? this.renderChatWindow() : null }
            </div>
        );
    }
}

ChatContainer.defaultProps = {
    'username': '',
    'usernameInputValue': '',
    'messageInputValue': '',
    'joinChat': noop,
    'leaveChat': noop,
    'setInputValue': noop,
    'clearFormData': noop,
    'sendChatMessage': noop,
};

ChatContainer.propTypes = {
    'username': PropTypes.string.isRequired,
    'joinChat': PropTypes.func.isRequired,
    'leaveChat': PropTypes.func.isRequired,
    'setInputValue': PropTypes.func.isRequired,
    'clearFormData': PropTypes.func.isRequired,
    'sendChatMessage': PropTypes.func.isRequired,
};

export default connect(
    state => ({
        userIds: state.chat.get('userIds'),
        usernameInputValue: state.form.get('chatUsername'),
        messageInputValue: state.form.get('chatMessage'),
        username: state.chat.get('username'),
        messages: state.chat.get('messages')
    }),
    dispatch => bindActionCreators({
        joinChat,
        leaveChat,
        setInputValue,
        clearFormData,
        sendChatMessage
    }, dispatch)
)(ChatContainer);