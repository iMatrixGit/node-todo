const Todos = require('../models/todoModel');

module.exports = app => {
    app.get('/api/setupTodos', (req, res) => {
        const starterTodos = [
            {
                username: 'john.doe',
                todo: 'Buy milk',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'mark.spenser',
                todo: 'Feed dog',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'lisa.thomson',
                todo: 'Clean the floor',
                isDone: false,
                hasAttachment: false
            }
        ];

        Todos.create(starterTodos, (err, results) => {
            if (err) {
                console.error(err);
            } else {
                res.send(results);
            }
        });
    });
};