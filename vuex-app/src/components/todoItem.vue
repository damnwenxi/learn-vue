<template>
  <div class="item" :class="{'completed':todo.completed}">
    <p style="padding-left:1em;">
      <input type="checkbox" v-model="todo.completed" />
      userId:{{todo.id}} - title:{{todo.title}}
      <button
        class="del"
        @click="$emit('handelDel',todo.id)"
      >X</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    todo: {
      type: Object
    }
  },
  methods: {
    checked() {
      this.todo.completed = !this.todo.completed;
    }
  }
};
</script>

<style scoped>
.item {
  width: 100%;
  background-color: antiquewhite;
  padding: 5px 0;
  margin: 5px 0;
}                     

.completed {
  text-decoration: line-through;
  background-color: #aaa;
}

.del {
  text-align: center;
  color: white;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 15px;
  background-color: red;
  float: right;
}

.del:hover {
  cursor: pointer;
  background-color: rgb(200, 0, 0);
}
</style>


