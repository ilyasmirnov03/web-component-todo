import todoService from "../TodoService.js";
import { TodoComponent } from "./TodoComponent.js";

export class TodoModify extends HTMLElement {

    /**
     * The todo to modify
     * @type Todo
     */
    todo;

    /**
     * TodoAdd component constructor.
     * @param {Todo} todo 
     */
    constructor(todo) {
        super();
        this.todo = todo;
    }

    /**
     * Actions on component initialization.
     */
    connectedCallback() {
        this.render(this.todo);
        this.attachHandlers();
    }

    /**
    * Attach event handlers.
    */
    attachHandlers() {
        this.$form.addEventListener('submit', this.updateTodo.bind(this));
    }

    /**
     * Render and initialize selected elements in variables.
     */
    render(todo) {
        this.innerHTML = `
            <form class='todo'>
                <label>
                    <input type="checkbox" name="done" ${todo.done ? 'checked' : ''}>
                </label>
                <label>
                    <input type="text" name="description" value="${todo.desc}" />
                </label>
                <div class='todo__buttons'>
                    <input type="submit"/>
                    <button data-action="delete" type="button">X</button>
                </div>
            </form>
        `;
        this.$form = this.querySelector('form');
    }

    /**
     * Update a todo.
     * @param {SubmitEvent} e Submit Event
     */
    updateTodo(e) {
        e.preventDefault();
        const data = new FormData(this.$form);
        const updatedTodo = {
            desc: data.get('description'),
            done: data.get('done') === 'on' ? true : false,
            created_at: this.todo.created_at,
        }
        todoService.update(updatedTodo);
        // Replace the component with updated todo component
        this.replaceWith(new TodoComponent(updatedTodo));
    }
}
customElements.define('todo-modify', TodoModify);