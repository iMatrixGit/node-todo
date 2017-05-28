import React, { PropTypes, Component } from "react";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    submitTodo,
    deleteTodo,
    fetchTodos,
    inputTodoText,
    doneTodo,
    undoneTodo
} from "../actions/todo";

class TodosContainer extends Component {
    componentWillMount() {
        const { fetchTodos } = this.props;

        fetchTodos();
    }

    render() {
        const { todos, inputText, inputTodoText } = this.props;
        const { submitTodo, doneTodo, undoneTodo, deleteTodo } = this.props;

        return (
            <div className="node-todo-app">
                <h1>Hello World!</h1>
                <AddTodoForm
                    inputText={inputText}
                    onChangeText={inputTodoText}
                    onSubmit={submitTodo}
                />
                <TodoList
                    items={todos}
                    onDoneTodo={doneTodo}
                    onUndoneTodo={undoneTodo}
                    onDeleteTodo={deleteTodo}
                />
            </div>
        );
    }
}

TodosContainer.propTypes = {
    'todos': PropTypes.object.isRequired,
    'inputText': PropTypes.string.isRequired,
    'fetchTodos': PropTypes.func.isRequired,
    'deleteTodo': PropTypes.func.isRequired,
    'inputTodoText': PropTypes.func.isRequired,
    'submitTodo': PropTypes.func.isRequired
};

export default connect(
    state => ({
        todos: state.todos.get('todosById'),
        inputText: state.todos.get('inputText')
    }),
    dispatch => bindActionCreators({
        submitTodo,
        deleteTodo,
        fetchTodos,
        inputTodoText,
        doneTodo,
        undoneTodo
    }, dispatch)
)(TodosContainer);

