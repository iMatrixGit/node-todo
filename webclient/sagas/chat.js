import {
    takeEvery,
    takeLatest,
    call,
    fork,
    apply,
    take,
    put
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import services from '../utils/services';
import {
    JOIN_CHAT,
    LEAVE_CHAT,
    USER_CONNECTED,
    USER_DISCONNECTED,
    RECEIVE_CONNECTED_USERS,
    SET_CHAT_USERNAME,
    SEND_CHAT_MESSAGE,
    RECEIVE_CHAT_MESSAGE
} from '../constants/chat';
import {
    userConnected,
    userDisconnected,
    addChatUser,
    removeChatUser,
    receiveConnectedUsers,
    consumeChatUsers,
    setChatUsername,
    receiveChatMessage,
    addChatMessage,
    consumeChatMessages
} from '../actions/chat';

class SocketManager {
    constructor() {
        this.socket = null;
    }

    joinRoom({ path = '/', username }) {
        this.socket = io(`http://localhost:3000${path}`, { query: `username=${username}` });

        return this.socket;
    }

    emit(event, data) {
        this.socket.emit(event, data);
    }
}

const socketManager = new SocketManager();

function createSocketChannel(socket) {
    return eventChannel(emit => {
        const userConnectedHandler = id => emit(userConnected(id));
        const userDisconnectedHandler = id => emit(userDisconnected(id));
        const receiveConnectedUsersHandler = ids => emit(receiveConnectedUsers(ids));
        const receiveChatMessageHandler = message => emit(receiveChatMessage(message));

        socket.on('user.connected', userConnectedHandler);
        socket.on('user.disconnected', userDisconnectedHandler);
        socket.on('chat.connected-users', receiveConnectedUsersHandler);
        socket.on('chat.message', receiveChatMessageHandler);
        socket.on('error', err => console.log(err));

        return () => {
            socket.off('user.connected', userConnectedHandler);
            socket.off('user.disconnected', userDisconnectedHandler);
            socket.off('chat.connected-users', receiveConnectedUsersHandler);
            socket.off('chat.message', receiveChatMessageHandler);
        };
    });
}

function* onJoinChat(action) {
    const { username } = action.payload;

    try {
        const socket = yield apply(socketManager, socketManager.joinRoom, [{ username }]);
        const socketChannel = yield call(createSocketChannel, socket);

        yield put(setChatUsername(username));
        yield fork(fetchInitialInfo);
        yield fork(watchSocketEvents, socketChannel);
        yield fork(watchSocketActions, socket);
        yield take(LEAVE_CHAT);
        yield apply(socket, socket.disconnect);
        yield apply(socketChannel, socketChannel.close);
    } catch (err) {
        console.error(err);
    }
}

// Worker sagas

function* fetchChatMessages() {
    try {
        const messages = yield call(services.getChatMessages);

        yield put(consumeChatMessages(messages));
    } catch (err) {
        console.error(err);
    }
}

function* fetchInitialInfo() {
    yield fork(fetchChatMessages);
}

// Handler sagas
function* onReceiveConnectedUsers(action) {
    const { ids } = action.payload;

    yield put(consumeChatUsers(ids));
}

function* onUserConnected(action) {
    const { id } = action.payload;

    yield put(addChatUser(id));
}

function* onUserDisconnected(action) {
    const { id } = action.payload;

    yield put(removeChatUser(id));
}

function onSetChatUsername(action) {
    const { username } = action.payload;
    const sessionUsername = sessionStorage.getItem('username');

    if (sessionUsername !== username) {
        sessionStorage.setItem('username', username);
    }
}

function* onSendChatMessage(action) {
    const { username, message } = action.payload;

    try {
        yield apply(socketManager, socketManager.emit, ['chat.message', { username, message }]);
        yield put(addChatMessage({ author: username, message }));

    } catch (err) {
        console.error(err);
    }
}

function* onReceiveChatMessage(action) {
    const { author, message } = action.payload;

    yield put(addChatMessage({ author, message }));
}

// Watcher sagas

function* watchSocketEvents(socketChannel) {
    while (true) {
        const action = yield take(socketChannel);

        yield put(action);
    }
}

function* watchSocketActions() {
    yield [
        watchSendChatMessage()
    ];
}

function* watchJoinChat() {
    yield takeEvery(JOIN_CHAT, onJoinChat);
}

function* watchReceiveConnectedUsers() {
    yield takeLatest(RECEIVE_CONNECTED_USERS, onReceiveConnectedUsers);
}

function* watchUserConnected() {
    yield takeEvery(USER_CONNECTED, onUserConnected);
}

function* watchUserDisconnected() {
    yield takeEvery(USER_DISCONNECTED, onUserDisconnected);
}

function* watchSetChatUsername() {
    yield takeLatest(SET_CHAT_USERNAME, onSetChatUsername);
}

function* watchSendChatMessage() {
    yield takeEvery(SEND_CHAT_MESSAGE, onSendChatMessage);
}

function* watchReceiveChatMessage() {
    yield takeEvery(RECEIVE_CHAT_MESSAGE, onReceiveChatMessage);
}

export default function* chatSaga() {
    yield [
        watchJoinChat(),
        watchUserConnected(),
        watchUserDisconnected(),
        watchReceiveConnectedUsers(),
        watchSetChatUsername(),
        watchReceiveChatMessage()
    ];
}

