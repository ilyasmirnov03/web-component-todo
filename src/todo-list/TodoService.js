class TodoService {

    /**
     * @typedef {object} Todo
     * @property {string} desc Todo description
     * @property {number} created_at Creation timestamp
     * @property {boolean} done Completion status
     */

    /**
     * @type Todo[]
     */
    todos = [];

    /**
     * TodoService constructor
     */
    constructor() {
        this.initializeTodos();
        this.subscribers = [];
    }

    /**
     * Subscriber function
     * @param {Function} callback
     * @public
     */
    subscribe(callback) {
        this.subscribers.push(callback);
    }

    /**
     * Execute each subscribers' callback.
     * @param {string} event Notification event
     * @param {any} data Data to send on notification.
     * @private
     */
    updateSubscribers(event, data) {
        this.subscribers.forEach(subscriber => subscriber(event, data));
    }

    /**
     * Update local storage with current todos array.
     * @private
     */
    updateLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    /**
     * Initialize todos.
     * @private
     */
    initializeTodos() {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos == null) {
            localStorage.setItem('todos', JSON.stringify([]));
        } else {
            this.todos = savedTodos;
        }
    }

    /**
     * Add a todo to the store.
     * @param {Todo} todo
     * @public
     */
    add(todo) {
        this.todos.push(todo);
        this.updateSubscribers('add', todo);
        this.updateLocalStorage();
    }

    /**
     * Remove todo from the store.
     * @param {number} id Timestamp of the todo to remove.
     * @public
     */
    remove(id) {
        const index = this.todos.findIndex(todo => id === todo.created_at);
        this.todos.splice(index, 1);
        this.updateSubscribers('remove');
        this.updateLocalStorage();
    }

    /**
     * Complete the todo.
     * @param {number} id Timestamp of the todo to update the completion status of.
     * @param {boolean} status Status to assign to the todo
     * @public
     */
    updateCompletion(id, status) {
        const index = this.todos.findIndex(todo => id === todo.created_at);
        this.todos[index].done = status;
        this.updateSubscribers('updateCompletion');
        this.updateLocalStorage();
    }
}

const todoService = new TodoService();
export default todoService;