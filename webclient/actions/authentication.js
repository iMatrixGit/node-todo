import { SIGN_UP, SIGN_IN } from '../constants/authentication';

export const signUp = ({ email, username, password }) => ({
    type: SIGN_UP,
    payload: { email, username, password }
});

export const signIn = ({ username, password }) => ({
    type: SIGN_IN,
    payload: { username, password }
});