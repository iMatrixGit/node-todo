import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class ChatMessage extends Component {
    render() {
        const { author, text, orientation, className } = this.props;

        return (
            <div className={classNames(
                'chat-message',
                `chat-message-${orientation}`,
                className
            )}>
                <div className="chat-message-title">
                    {author}
                </div>
                <div className="chat-message-text">
                    {text}
                </div>
            </div>
        );
    }
}

ChatMessage.defaultProps = {
    'text': '',
    'author': '',
    'orientation': 'left'
};

ChatMessage.propTypes = {
    'text': PropTypes.string.isRequired,
    'author': PropTypes.string.isRequired,
    'orientation': PropTypes.string.isRequired,
    'className': PropTypes.string
};