import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  actions: {
    addTodo(text) {
      this.todos.push({ text, done: false });
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodoStatus(index) {
      this.todos[index].done = !this.todos[index].done;
    },
  },
  getters: {
    incompleteTodos() {
      return this.todos.filter(todo => !todo.done).length;
    },
  },
});
