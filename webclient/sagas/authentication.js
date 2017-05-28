import { takeLatest, call } from 'redux-saga/effects';
import services from '../utils/services';
import { SIGN_UP, SIGN_IN } from '../constants/authentication';

function* onSignUp(action) {
    const { email, username, password } = action.payload;

    if (email && username && password) {
        const body = { email, username, password };

        try {
            const response = yield call(services.register, { body });
        } catch (err) {
            console.error(err);
        }
    }
}

function* onSignIn(action) {
    const { username, password } = action.payload;

    if (username && password) {
        try {
            const body = { username, password };
            const response = yield call(services.login, { body });

            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP, onSignUp);
}

function* watchSignIn() {
    yield takeLatest(SIGN_IN, onSignIn)
}

export default function* authenticationSaga() {
    yield [
        watchSignUp(),
        watchSignIn()
    ];
}
