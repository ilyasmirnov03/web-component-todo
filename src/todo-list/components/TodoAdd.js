import todoService from "../TodoService.js";

export class TodoAdd extends HTMLElement {

    /**
     * TodoAdd component constructor.
     */
    constructor() {
        super();
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
        this.$form.addEventListener('submit', this.addTodo.bind(this));
    }

    /**
     * Render and initialize selected elements in variables.
     */
    render() {
        this.innerHTML = `
            <form>
                <input name="description" placeholder="Todo description"/>
                <input type="submit"/>            
            </form>
        `;
        this.$form = this.querySelector('form');
    }

    /**
     * Create a new todo.
     * @param {SubmitEvent} e Submit Event
     */
    addTodo(e) {
        e.preventDefault();
        const data = new FormData(this.$form);

        todoService.add({
            desc: data.get('description'),
            done: false,
            created_at: Date.now()
        });
    }
}
customElements.define('todo-add', TodoAdd);