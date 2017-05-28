import Immutable from 'immutable';
import {
    REMOVE_TODO,
    CONSUME_TODOS,
    INPUT_TODO_TEXT,
    DONE_TODO,
    UNDONE_TODO,
    CLEAR_TODO_INPUT
} from '../constants/todo';

const initialState = Immutable.Map({
    todosById: Immutable.Map(),
    todoIds: Immutable.List(),
    inputText: ''
});

export default function (state = initialState, action) {
    switch (action.type) {
        case REMOVE_TODO:
            state = state.deleteIn(['todosById', action.payload.id]);
            break;
        case CONSUME_TODOS:
            const { todos } = action.payload;

            todos.forEach(({ id, title, owner, isDone, hasAttachment }) => {
                state = state.setIn(['todosById', id],
                    Immutable.Map({ title, owner, isDone, hasAttachment }))
            });
            break;
        case INPUT_TODO_TEXT:
            state = state.set('inputText', action.payload.text);
            break;
        case CLEAR_TODO_INPUT:
            state = state.set('inputText', initialState.get('inputText'));
            break;
        case DONE_TODO:
            state = state.updateIn(['todosById', action.payload.id],
                todo => {
                    if (todo) {
                        return todo.set('isDone', true);
                    }

                    return todo;
                });
            break;
        case UNDONE_TODO:
            state = state.updateIn(['todosById', action.payload.id],
                todo => {
                    if (todo) {
                        return todo.set('isDone', false);
                    }

                    return todo;
                });
            break;
        default:
            break;
    }

    return state;
}