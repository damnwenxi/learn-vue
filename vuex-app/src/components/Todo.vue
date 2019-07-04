<template>
  <div>
    <div class="todo-list">
      <todo-item
        @handelDel="$emit('handelDel',todo.id)"
        :todo="todo"
        v-for="todo in todos"
        :key="todo.id"
      ></todo-item>
    </div>
  </div>
</template>

<script>
import todoItem from "./todoItem";
export default {
  data() {
    return {};
  },
  props: {
    todos: {
      type: Array
    }
  },
  components: {
    todoItem
  }
};
</script>

<style scoped>
</style>


