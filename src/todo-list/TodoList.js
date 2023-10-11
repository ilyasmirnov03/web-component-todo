import { Todo } from "./components/TodoComponent.js";

export class TodoList extends HTMLElement {

    /**
     * TodoList component constructor.
     */
    constructor() {
        super();
        this.todos = this.getTodos();
        this.$todosContainer = document.querySelector('.todos-container');
        console.log('todos list after init', this.todos);
    }

    /**
     * Actions on component initialization.
     */
    connectedCallback() {
        this.render();
        this.renderTodos();
    }

    /**
     * Attach event handlers.
     */
    attachHandlers() {

    }

    /**
     * Initial render of the component.
     */
    render() {
        this.innerHTML = `
            <todo-add></todo-add>
            <div class='todos-container'>
                ${this.todos.length === 0 ? 'No todos have been added.' : ''}
            </div>
        `;
    }

    /**
     * Render todos from todo list.
     */
    renderTodos() {
        this.todos.forEach(todo => {
            this.$todosContainer.appendChild(new Todo(todo));
        });
    }

    /**
     * Return the saved todo list.
     * If none were found, creates new list and saves it in local storage.
     * @returns object[]
     */
    getTodos() {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos == null) {
            localStorage.setItem('todos', JSON.stringify([]));
            return [];
        }
        return savedTodos;
    }
}
customElements.define('todo-list', TodoList);