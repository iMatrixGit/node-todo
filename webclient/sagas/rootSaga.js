import authenticationSaga from './authentication';
import todoSaga from './todo';
import chatSaga from './chat';

export default function* rootSaga() {
    yield [
        authenticationSaga(),
        todoSaga(),
        chatSaga()
    ];
}