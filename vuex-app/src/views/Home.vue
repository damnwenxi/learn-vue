<template>
  <div class="home">
    <add-todo @handelAdd="addItem"></add-todo>
    <todos @handelDel="deleteItem" :todos="todoList" />
  </div>
</template>

<script>
// @ is an alias to /src
import todos from "../components/Todo";
import addTodo from "../components/addTodo";
import uuid from "uuid";

export default {
  name: "home",
  data() {
    return {
      todoList: []
    };
  },
  components: {
    todos,
    addTodo
  },
  created() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.todoList = data;
      })
      .catch(e => {
        this.todoList = [];
        console.log(e);
      });
  },
  methods: {
    deleteItem(id) {
      this.todoList = this.todoList.filter(e => {
        return e.id !== id;
      });
    },
    addItem(title) {
      if (!title) {
        alert("事件不能为空");
        return;
      }
      const item = {
        id: uuid.v4(),
        title,
        completed: false
      };

      this.todoList.unshift(item);
    }
  }
};
</script>
