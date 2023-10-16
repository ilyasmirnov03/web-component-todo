import todoService from "../TodoService.js";
import { TodoModify } from "./TodoModify.js";

export class TodoComponent extends HTMLElement {

    /**
     * Todo component constructor.
     * @param {Todo} todo 
     */
    constructor(todo) {
        super();
        this.todo = todo;
        this.render(todo);
    }

    /**
     * Actions on component initialization.
     */
    connectedCallback() {
        this.attachHandlers();
    }

    /**
     * Attach event handlers.
     */
    attachHandlers() {
        this.querySelector('[data-action="delete"]').addEventListener('click', this.removeTodo.bind(this));
        this.querySelector('[data-action="modify"]').addEventListener('click', this.toggleUpdate.bind(this));
        this.querySelector('[type="checkbox"]').addEventListener('change', this.checkTodo.bind(this));
    }

    /**
     * Check todo.
     * @param {Event} e 
     */
    checkTodo(e) {
        todoService.updateCompletion(this.todo.created_at, e.currentTarget.checked);
    }

    /**
     * Replaces this component with TodoModify
     */
    toggleUpdate() {
        this.replaceWith(new TodoModify(this.todo));
    }

    /**
     * Remove a todo
     */
    removeTodo() {
        todoService.remove(this.todo.created_at);
        this.remove();
    }

    /**
     * Initial component render.
     */
    render(todo) {
        this.innerHTML = `
            <section class='todo'>
                <label>
                    <input type="checkbox" ${todo.done ? 'checked' : ''}>
                    ${todo.desc}
                </label>
                <div class='todo__buttons'>
                    <button data-action="modify">Modifier</button>
                    <button data-action="delete">X</button>
                </div>
            </section>
        `;
    }
}
customElements.define('todo-component', TodoComponent);