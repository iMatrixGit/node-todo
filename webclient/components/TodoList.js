import React, { PropTypes, Component } from 'react';
import { List } from 'react-virtualized';
import { TodoListItem } from '.';

export default class TodoList extends Component {
    constructor() {
        super();

        this.state = { scrollTop: 0 };

        this.renderItem = this.renderItem.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    computeScrollThumbHeight() {
        const { height = 200, items, itemHeight = 40 } = this.props;
        const listHeight = items.size * itemHeight;
        const ratio = height / listHeight;

        return height * ratio;
    }

    onScroll({ clientHeight, scrollHeight, scrollTop }) {
        const ratio = clientHeight / scrollHeight;
        const thumbScrollTop = scrollTop * ratio;

        this.setState({ scrollTop: thumbScrollTop });
    }

    renderItem({ key, index, isScrolling, isVisible, style }) {
        const { items, onDoneTodo, onUndoneTodo, onDeleteTodo } = this.props;
        const item = items.toArray()[index];
        const id = items.keySeq().get(index);
        const isDone = item.get('isDone');

        return (
            <TodoListItem
                key={key}
                id={id}
                style={style}
                title={item.get('title')}
                isDone={isDone}
                onClick={isDone ? onUndoneTodo : onDoneTodo}
                onDeleteClick={onDeleteTodo}
            />
        )
    }

    render() {
        const { items } = this.props;
        const { scrollTop } = this.state;
        const noop = () => {};

        if (!items.size) {
            return null;
        }

        const thumbHeight = this.computeScrollThumbHeight();

        return (
        <div className="scrollable-list">
            <List
                width={620}
                height={200}
                rowCount={items.size}
                rowHeight={40}
                rowRenderer={this.renderItem}
                className="todo-list"
                forceUpdateGrid={noop}
                onScroll={this.onScroll}
            />
            <div className="scrollbar">
                <span
                    className="scroll-thumb"
                    style={{
                        'position': 'absolute',
                        'width': 10,
                        'height': thumbHeight,
                        'transform': `translateY(${scrollTop}px)`
                    }}
                />
            </div>
        </div>
        );
    }
}

TodoList.propTypes = {
    'width': PropTypes.number.isRequired,
    'height': PropTypes.isRequired,
    'items': PropTypes.object.isRequired,
    'onDoneTodo': PropTypes.func.isRequired,
    'onUndoneTodo': PropTypes.func.isRequired,
    'onDeleteTodo': PropTypes.func.isRequired
};