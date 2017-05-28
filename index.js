import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { todoReducer, formReducer, chatReducer } from './webclient/reducers';
import App from './webclient/App';
import rootSaga from './webclient/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
    todos: todoReducer,
    form: formReducer,
    chat: chatReducer
});

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('app')
);