module.exports = (server, dbConnection) => {
    const io = require('socket.io')(server);
    const connections = { ids: [], users: [] };

    io.use((socket, next) => {
        const { id, handshake: { query: { username } } } = socket;

        if (connections.users.includes(username)) {
            next(new Error('Username already in use.'));
        } else {
            socket.username = username;

            connections.ids.push(id);
            connections.users.push(username);

            next();
        }
    });

    io.on('connection', socket => {
        const { id, username } = socket;

        console.log('Connected: ', id, ', ', username);
        console.log('Connections: ', connections.ids.length);

        socket.emit('chat.connected-users', connections.users);
        socket.broadcast.emit('user.connected', username);

        socket.on('disconnect', () => {
            console.log('Disconnected!', id, username);
            connections.ids = connections.ids.filter(id => id !== socket.id);
            connections.users = connections.users.filter(name => name !== username);
            console.log('Connections: ', connections.ids.length);
            socket.broadcast.emit('user.disconnected', username);
        });

        socket.on('chat.message', ({ username, message })  => {
            console.log(username, message);

            if (username && message) {
                dbConnection.query('CALL insertMessage(?, ?)', [username, message], error => {
                    if (error) {
                        console.error(error);
                    } else {
                        socket.broadcast.emit('chat.message', { author: username, message });
                    }
                })
            }
        });
    });
};

