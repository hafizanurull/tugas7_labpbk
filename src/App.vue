<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-4">Todo List</h1>
    <div class="mb-4">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task"
             class="border p-2 w-full rounded"/>
      <button @click="addTodo" class="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700">Add</button>
    </div>
    <ul>
      <li v-for="(todo, index) in todos" :key="index" class="flex items-center mb-2">
        <input type="checkbox" v-model="todo.done" @change="toggleTodoStatus(index)"
               class="mr-2"/>
        <span :class="{ 'line-through': todo.done }" class="flex-1">{{ todo.text }}</span>
        <button @click="removeTodo(index)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">Remove</button>
      </li>
    </ul>
    <p class="mt-4">Total incomplete tasks: {{ incompleteTodos }}</p>
  </div>
</template>

<script>
import { useTodoStore } from './stores/todoStore';
import { ref, computed } from 'vue';

export default {
  setup() {
    const todoStore = useTodoStore();
    const newTodo = ref('');

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value.trim());
        newTodo.value = '';
      }
    };

    const removeTodo = (index) => {
      todoStore.removeTodo(index);
    };

    const toggleTodoStatus = (index) => {
      todoStore.toggleTodoStatus(index);
    };

    return {
      newTodo,
      addTodo,
      removeTodo,
      toggleTodoStatus,
      todos: computed(() => todoStore.todos),
      incompleteTodos: computed(() => todoStore.incompleteTodos),
    };
  },
};
</script>

<style>
.line-through {
  text-decoration: line-through;
}
</style>
