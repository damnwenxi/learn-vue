<template>
  <div class="add-todo">
    <p>
      <input v-model="title" type="text" placeholder="在此输入待办事项..." />
      <button @click="handelAdd">立即添加</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    handelAdd() {
      this.$emit("handelAdd", this.title);
      this.title = "";
    }
  }
};
</script>

<style scoped>
p input {
  display: inline-block;
  line-height: 50px;
  width: 79%;
  border: none;
  border-bottom: 1px solid #ccc;
}

p button {
  float: right;
  line-height: 50px;
  display: inline-block;
  width: 20%;
  border: none;
  background-color: #bbb;
}

p button:hover {
  cursor: pointer;
}
</style>
