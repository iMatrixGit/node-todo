export const parseTodo = ({ _id, todo, username, isDone, hasAttachment } = {}) => ({
    id: _id,
    title: todo,
    owner: username,
    isDone,
    hasAttachment
});