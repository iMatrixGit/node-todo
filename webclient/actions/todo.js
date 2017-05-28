import {
    REMOVE_TODO,
    CONSUME_TODOS,
    FETCH_TODOS,
    INPUT_TODO_TEXT,
    SUBMIT_TODO,
    DONE_TODO,
    UNDONE_TODO,
    DELETE_TODO,
    CLEAR_TODO_INPUT
} from '../constants/todo';

export const submitTodo = ({ text, author, hasAttachment = false }) => ({
    type: SUBMIT_TODO,
    payload: { text, author, hasAttachment }
});

export const removeTodo = id => ({
    type: REMOVE_TODO,
    payload: { id }
});

export const consumeTodos = todos => ({
    type: CONSUME_TODOS,
    payload: { todos }
});

export const fetchTodos = ({ username = '' } = {}) => ({
    type: FETCH_TODOS,
    payload: { username }
});

export const inputTodoText = text => ({
    type: INPUT_TODO_TEXT,
    payload: { text }
});

export const clearTodoInput = () => ({
    type: CLEAR_TODO_INPUT
});

export const doneTodo  = id => ({
    type: DONE_TODO,
    payload: { id }
});

export const undoneTodo = id => ({
    type: UNDONE_TODO,
    payload: { id }
});

export const deleteTodo = id => ({
    type: DELETE_TODO,
    payload: { id }
});