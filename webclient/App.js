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