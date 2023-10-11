export class TodoComponent extends HTMLElement {

    /**
     * Todo component constructor.
     * @param {object} todo 
     */
    constructor(todo) {
        super();
        this.todo = todo;
        this.innerHTML = this.render(todo);
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

    }

    /**
     * Return the content to render in the component.
     * @returns {string} Content to render
     */
    render(todo) {
        return `
            <input type="checkbox" ${todo.done ? 'checked' : ''}>
            <p>${todo.desc}</p>
            <button data-action="modify">Modifier</button>
            <button data-action="delete">X</button>
        `;
    }
}
customElements.define('todo-component', TodoComponent);