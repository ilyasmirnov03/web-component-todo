import todoService from "./TodoService.js";
import { TodoComponent } from "./components/TodoComponent.js";

export class TodoList extends HTMLElement {

    /**
     * TodoList component constructor.
     */
    constructor() {
        super();
        this.todos = todoService.todos;
        todoService.subscribe((event, data) => {
            this.todos = todoService.todos;
            if (event === 'add') {
                this.appendNewTodo(data);
            }
            console.log('todos list after init ', event, this.todos);
        });
    }

    /**
     * Actions on component initialization.
     */
    connectedCallback() {
        this.render();
        this.attachHandlers();
    }

    /**
     * Attach event handlers.
     */
    attachHandlers() {
        // Todo add event
    }


    /**
     * Append new todo to the todo list.
     * @param {Todo} todo Data from new submitted todo.
     */
    appendNewTodo(todo) {
        if (this.todos.length === 0) {
            this.$todosContainer.innerHTML = '';
        }
        this.$todosContainer.appendChild(new TodoComponent(todo));
    }

    /**
     * Initial render of the component.
     * Also initializes selected elements into variables.
     */
    render() {
        this.innerHTML = `
            <todo-add></todo-add>
            <div class='todo__container'>
                ${this.todos.length === 0 ? 'No todos have been added.' : ''}
            </div>
        `;
        this.$todosContainer = document.querySelector('.todo__container');
        this.renderTodos();
    }

    /**
     * Render todos from todo list.
     */
    renderTodos() {
        this.todos.forEach(todo => {
            this.$todosContainer.appendChild(new TodoComponent(todo));
        });
    }
}
customElements.define('todo-list', TodoList);