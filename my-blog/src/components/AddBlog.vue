<template>
  <div v-theme="'narrow'" class="add-blog">
    <h1>Add-Blog</h1>
    <form v-if="!submmited">
      <label>博客标题</label>
      <input class="title" type="text" v-model="blog.title">
      
      <label>内容</label>
      <textarea v-model="blog.content"></textarea>
      
      <label>分类</label>
      <div class="checkbox">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories">
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories">
        <label>Angular</label>
        <input type="checkbox" value="Angular" v-model="blog.categories">
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories">
      </div>

      <label>作者</label>
      <select v-model="blog.author">
        <option v-for="author in authors" :key="author">{{author}}</option>
      </select>
      
      <button v-on:click.prevent="post">添加博客</button>
    </form>

    <div v-if="submmited">
      <h2>您的博客添加成功！</h2>
    </div>

    <hr>

    <div class="show">
      <p>标题：{{blog.title}}</p>
      <p>内容：{{blog.content}}</p>
      <p>分类：
        <a v-for="category in blog.categories" :key="category">{{category}}</a>
      </p>
      <p>作者：{{blog.author}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-blog",
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      authors: ["kkboom", "nikon", "fanbo"],
      submmited: false
    };
  },

  methods: {
    post: function() {
      this.$http
        .post("https://wd8587891064eqnnsv.wilddogio.com/posts.json", this.blog)
        .then(function(data) {
          console.log(data);
          this.submmited = true;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-blog {
  margin: 10px auto;
}

form label {
  display: block;
  margin-top: 10px;
}
form .title {
  padding: 0 10px;
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ddd;
  line-height: 30px;
  margin-top: 10px;
}

form textarea {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ddd;
  line-height: 30px;
  margin-top: 10px;
  padding: 10px;
}

.checkbox label,
input {
  display: inline;
  margin-right: 20px;
}
form select {
  width: 100%;
  box-sizing: border-box;
  line-height: 30px;
  margin: 10px auto;
}
form button {
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  background-color: brown;
}
.show{
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  background: #ddd
}
.show p{
  line-height: 30px;
}
</style>
