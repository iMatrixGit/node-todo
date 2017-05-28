import {
    JOIN_CHAT,
    LEAVE_CHAT,
    USER_CONNECTED,
    USER_DISCONNECTED,
    ADD_CHAT_USER,
    REMOVE_CHAT_USER,
    RECEIVE_CONNECTED_USERS,
    CONSUME_CHAT_USERS,
    SET_CHAT_USERNAME,
    SEND_CHAT_MESSAGE,
    RECEIVE_CHAT_MESSAGE,
    ADD_CHAT_MESSAGE,
    REMOVE_CHAT_MESSAGE,
    CONSUME_CHAT_MESSAGES
} from '../constants/chat';

export const joinChat = username => ({
    type: JOIN_CHAT,
    payload: { username }
});
export const leaveChat = username => ({
    type: LEAVE_CHAT,
    payload: { username }
});
export const userConnected = id => ({
    type: USER_CONNECTED,
    payload: { id }
});
export const userDisconnected = id => ({
    type: USER_DISCONNECTED,
    payload: { id }
});

export const addChatUser = id => ({
    type: ADD_CHAT_USER,
    payload: { id }
});

export const removeChatUser = id => ({
    type: REMOVE_CHAT_USER,
    payload: { id }
});

export const receiveConnectedUsers = ids => ({
    type: RECEIVE_CONNECTED_USERS,
    payload: { ids }
});

export const consumeChatUsers = ids => ({
    type: CONSUME_CHAT_USERS,
    payload: { ids }
});

export const setChatUsername = username => ({
    type: SET_CHAT_USERNAME,
    payload: { username }
});

export const sendChatMessage = ({ username, message }) => ({
    type: SEND_CHAT_MESSAGE,
    payload: { username, message }
});

export const receiveChatMessage = ({ author, message }) => ({
    type: RECEIVE_CHAT_MESSAGE,
    payload: { author, message }
});

export const consumeChatMessages = messages => ({
    type: CONSUME_CHAT_MESSAGES,
    payload: { messages }
});


export const addChatMessage = ({ author, message }) => ({
    type: ADD_CHAT_MESSAGE,
    payload: { author, message }
});

export const removeChatMessage = id => ({
    type: REMOVE_CHAT_MESSAGE,
    payload: { id }
});