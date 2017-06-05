import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import { Button } from '.';

const TodoListItemText = ({ text }) => (
    <div className="todo-list-item-text">{text}</div>
);

export default class TodoListItem extends PureComponent {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onClick() {
        const { id, onClick } = this.props;

        onClick(id);
    }

    onDeleteClick(e) {
        const { id, onDeleteClick } = this.props;

        e.stopPropagation();
        onDeleteClick(id);
    }

    render() {
        const { title, isDone, style } = this.props;

        return (
            <div
                className={classNames(
                    'todo-list-item',
                    { 'todo-list-item-done': isDone }
                )}
                style={style}
                onClick={this.onClick}
            >
                <TodoListItemText text={title} />
                <Button
                    className="delete-button"
                    text="Remove"
                    onClick={this.onDeleteClick}
                />
            </div>
        );
    }
}

TodoListItem.defaultProps = {
    'id': '',
    'title': '',
    'isDone': false,
    'onClick': () => {}
};

TodoListItem.propTypes = {
    'id': PropTypes.string.isRequired,
    'title': PropTypes.string.isRequired,
    'isDone': PropTypes.bool.isRequired,
    'onClick': PropTypes.func.isRequired
};