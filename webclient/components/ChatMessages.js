import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ChatMessage } from '.';

export default class ChatMessages extends Component {
    constructor() {
        super();

        this.renderMessage = this.renderMessage.bind(this);
    }

    isOwnMessage(message) {
        const { username } = this.props;

        return message.get('author') === username;
    }

    renderMessage(message, index) {
        const orientation = this.isOwnMessage(message) ? 'right' : 'left';

        return (
            <ChatMessage
                key={index}
                author={message.get('author')}
                text={message.get('message')}
                orientation={orientation}
            />
        )
    }

    render() {
        const { className, messages } = this.props;

        if (!messages) {
            return null;
        }

        return (
            <div className={classNames(
                'chat-messages',
                className
            )}>
                {messages.size ? messages.map(this.renderMessage) : null}
            </div>
        );
    }
}

ChatMessages.propTypes = {
    'messages': PropTypes.object.isRequired,
    'className': PropTypes.string
};