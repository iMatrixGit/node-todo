import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import {
    TodosContainer,
    RegisterContainer,
    LoginContainer,
    ChatContainer
} from './containers';

const history = createBrowserHistory();

export default class App extends Component {
    componentWillMount() {
        //const socket = io('http://localhost:3000');

        //socket.on('connect', () => console.log('Connected!'));
        //socket.on('disconnect', () => console.log('Disconnected!'));
        //socket.on('custom-event', id => console.log(`${id}, has connected`));
        //socket.emit('welcome', 'Hello friends!');

        //socket.on('welcome-too', msg => console.log(msg));
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Link to="/">Todos</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/chat">Chat</Link>
                    <Route path="/" exact={true} component={TodosContainer} />
                    <Route path="/register" component={RegisterContainer} />
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/chat" component={ChatContainer} />
                </div>
            </Router>
        );
    }
};