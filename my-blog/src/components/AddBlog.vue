<template>
  <div class="add-blog">
    <h1>Add-Blog</h1>
    <h2>添加博客</h2>
    <form v-if="!submmited">
      <label>博客标题</label>
      <input type="text" v-model="blog.title">

      <label>内容</label>
      <textarea v-model="blog.content"></textarea>

      <label>分类</label>
      <ul>
        <li><label>Vue.js</label><input type="checkbox" value="Vue.js" v-model="blog.categories"></li>
        <li><label>Node.js</label><input type="checkbox" value="Node.js" v-model="blog.categories"></li>
        <li><label>Angular</label><input type="checkbox" value="Angular" v-model="blog.categories"></li>
        <li><label>React.js</label><input type="checkbox" value="React.js" v-model="blog.categories"></li>
      </ul>
      
      <label>作者</label>
      <select v-model="blog.author">
        <option v-for="author in authors">{{author}}</option>
      </select>

      <button v-on:click.prevent="post">添加博客</button>

    </form>

    <div v-if="submmited">
      <h2>您的博客添加成功！</h2>
    </div>

    <hr>


    <p>标题：{{blog.title}}</p>
    <p>内容：{{blog.content}}</p>
    <p>分类：<a v-for="category in blog.categories">{{category}}</a></p>
    <p>作者：{{blog.author}}</p>

  </div>
</template>

<script>
export default {
  name: 'add-blog',
  data () {
    return{
      blog:{
        title:"", 
        content:"",
        categories:[],
        author:"",
      },
      authors:["kkboom","nikon","fanbo"],
      submmited:false
    }
  },

  methods:{
    post:function(){
      this.$http.post("https://jsonplaceholder.typicode.com/posts",{title:this.blog.title,
        body:this.blog.content,
        userID:1
      })
      .then(function(data){
        console.log(data);
        this.submmited=true;
      })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
