const Todos = require('../models/todoModel');
const Users = require('../models/userModel');
const bodyParser = require('body-parser');
const R = require('ramda');

const isNotNil = R.compose(R.not, R.isNil);
const pickDefined = R.pickBy(isNotNil);

const checkSession = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({ message: 'Unauthorized' });
    }
};

module.exports = (app, passport) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/todos', (req, res) => {
        Todos.find({}, (err, results) => {
            if (err) {
                console.error(err);
            } else {
                res.send(results);
            }
        });
    });

    app.get('/api/todos/:username', (req, res) => {
        Todos.find({ username: req.params.username }, (err, results) => {
            if (err) {
                console.error(err);
            } else {
                res.send(results);
            }
        });
    });

    app.get('/api/todo/:id', (req, res) => {
        Todos.findById(req.params.id, (err, todo) => {
            if (err) {
                console.error(err);
            } else {
                res.send(todo);
            }
        });
    });

    app.post('/api/todo', checkSession, (req, res) => {
        const { username, todo, isDone, hasAttachment } = req.body;

        Todos.create({ username, todo, isDone, hasAttachment }, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                res.send(result);
            }
        });
    });

    app.put('/api/todo/:id', checkSession, (req, res) => {
        const { id } = req.params;
        const { username, todo, isDone, hasAttachment } = req.body;
        const updatedFields = pickDefined({ username, todo, isDone, hasAttachment });

        Todos.findByIdAndUpdate(id, updatedFields, { new: true }, (err, todo) => {
            if (err) {
                console.error(err);
            } else {
                res.send(todo);
            }
        });
    });

    app.delete('/api/todo/:id', checkSession, (req, res) => {
        Todos.findByIdAndRemove(req.params.id, (err, todo) => {
            if (err) {
                console.error(err);
            } else {
                res.send(todo);
            }
        });
    });

    app.post('/api/register',
        passport.authenticate('local-signup'),
        (req, res) => {
            const { email, username, password } = req.body;
            const newUser = new Users();

            newUser.email = email;
            newUser.username = username;
            newUser.password = newUser.generateHash(password);

            newUser.save(err => {
                if (err) {
                    res.status(409).send(err);
                } else {
                    res.status(200).send(newUser);
                }
            });
    });

    app.post('/api/login',
        passport.authenticate('local-signin'),
        (req, res) => {
            const { username } = req.body;

            res.status(200).json({ username });
    });
};