import Immutable from 'immutable';
import {
    CONSUME_CHAT_USERS,
    ADD_CHAT_USER,
    REMOVE_CHAT_USER,
    LEAVE_CHAT,
    SET_CHAT_USERNAME,
    ADD_CHAT_MESSAGE,
    CONSUME_CHAT_MESSAGES
} from '../constants/chat';

const messageInitialState = Immutable.Map({
    author: '',
    message: '',
    timestamp: 0
});

const initialState = Immutable.Map({
    username: '',
    userIds: Immutable.List(),
    messages: Immutable.List()
});

const parseChatMessages = messages => messages.map(
    ({
        author,
        message,
        date_created
    }) => messageInitialState.merge({
        author,
        message,
        timestamp: new Date(date_created).getTime()
    })
);
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CHAT_USERNAME:
            state = state.set('username', action.payload.username);
            break;
        case CONSUME_CHAT_USERS:
            state = state.set('userIds', Immutable.List(action.payload.ids));
            break;
        case CONSUME_CHAT_MESSAGES:
            const { messages } = action.payload;

            state = state.set('messages', Immutable.List(parseChatMessages(messages)));
            break;
        case ADD_CHAT_USER:
            state = state.update('userIds', userIds => userIds.push(action.payload.id));
            break;
        case ADD_CHAT_MESSAGE:
            const { author, message } = action.payload;
            const newMessage = initialState.merge({ author, message });

            state = state.update('messages', messages => messages.push(newMessage));
            break;
        case REMOVE_CHAT_USER:
            const { id } = action.payload;

            if (state.get('userIds').contains(id)) {
                state = state.update('userIds',
                    userIds => userIds.filter(userId => userId !== id));
            }
            break;
        case LEAVE_CHAT:
            state = initialState;
            break;
        default:
            break;
    }

    return state;
}