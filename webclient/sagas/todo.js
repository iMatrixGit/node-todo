import { delay } from 'redux-saga';
import { takeEvery, takeLatest, call, put, race } from 'redux-saga/effects'
import {
    FETCH_TODOS,
    SUBMIT_TODO,
    DONE_TODO,
    UNDONE_TODO,
    DELETE_TODO
} from '../constants/todo';
import {
    consumeTodos,
    doneTodo,
    undoneTodo,
    removeTodo,
    clearTodoInput
} from '../actions/todo';
import services from '../utils/services';
import { parseTodo } from '../utils/todo';

function* handleFetchTodos(action) {
    const { username } = action.payload;

    try {
        let results;

        if (username) {
            results = yield call(services.getUserTodos, { params: { username }});
        } else {
            results = yield call(services.getTodos);
        }

        yield put(consumeTodos(results.map(parseTodo)));
    } catch (err) {
        console.error(err);
    }
}

function* handleSubmitTodo(action) {
    const { text: todo, author: username, hasAttachment } = action.payload;

    try {
        const result = yield call(services.addTodo, {
                body: {
                    todo,
                    username,
                    hasAttachment,
                    isDone: false
                }
            }
        );
        yield put(consumeTodos([parseTodo(result)]));
        yield put(clearTodoInput());
    } catch (err) {
        console.error(err)
    }
}

function* handleDoneTodo(action) {
    const { id } = action.payload;

    try {
        const { timeout } = yield race({
            success: call(services.editTodo, {
                params: { id },
                body: { isDone: true }
            }),
            timeout: call(delay, 5000)
        });

        if (timeout) {
            yield put(undoneTodo(id));
        }
    } catch (err) {
        console.error(err);

        yield put(undoneTodo(id));
    }
}

function* handleUndoneTodo(action) {
    const { id } = action.payload;

    try {
        const { timeout } = yield race({
            success: call(services.editTodo, {
                params: { id },
                body: { isDone: false }
            }),
            timeout: call(delay, 5000)
        });

        if (timeout) {
            yield put(doneTodo(id));
        }

    } catch (err) {
        console.error(err);

        yield put(doneTodo(id));
    }
}

function* handleDeleteTodo(action) {
    const { id } = action.payload;

    try {
        const { timeout } = yield race({
            success: call(services.removeTodo, { params: { id } }),
            timeout: call(delay, 5000)
        });

        if (!timeout) {
            yield put(removeTodo(id));
        }

    } catch (err) {
        console.error(err);
    }
}

function* watchFetchTodos() {
    yield takeLatest(FETCH_TODOS, handleFetchTodos)
}

function* watchSubmitTodo() {
    yield takeLatest(SUBMIT_TODO, handleSubmitTodo);
}

function* watchDoneTodo() {
    yield takeEvery(DONE_TODO, handleDoneTodo);
}

function* watchUndoneTodo() {
    yield takeEvery(UNDONE_TODO, handleUndoneTodo);
}

function* watchDeleteTodo() {
    yield takeEvery(DELETE_TODO, handleDeleteTodo);
}

export default function* todoSaga() {
    yield [
        watchFetchTodos(),
        watchSubmitTodo(),
        watchDoneTodo(),
        watchUndoneTodo(),
        watchDeleteTodo()
    ]
}