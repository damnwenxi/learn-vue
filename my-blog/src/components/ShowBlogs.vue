<template>
  <div v-theme="'narrow'" class="show-blogs">
    <h1>Show-Blogs</h1>

    <input class="search" type="text" v-model="search" placeholder="搜索">

    <div class="item" v-for="blog in filterBlogs" :key="blog.id">
      <router-link v-bind:to="'/blog/'+blog.id">
        <h2 v-rainbow>{{blog.title | snippet}}</h2>
      </router-link>
      <article>{{blog.content}}</article>
    </div>

  </div>
</template>

<script>
export default {
  name: 'show-blogs',
  data () {
    return{
      blogs:[],
      search:""
    }
  },

  

  methods:{
  
  },
  // 自定义计算属性
  computed:{
    filterBlogs:function(){
      return this.blogs.filter((blog)=>{
        return blog.title.match(this.search);
      })
    }
  },

  created(){
    this.$http.get("https://wd8587891064eqnnsv.wilddogio.com/posts.json")
      .then(function(data){
        //this.blogs=data.body.slice(0,10);
        // console.log(data.json());
        return data.json();
      }).then(function(data){
        for(let key in data){
          // console.log(key);
          data[key].id = key;
          this.blogs.push(data[key]);
          // console.log(data[key]);
        }
      })
  },
  // 自定义过滤器
  filters:{
    "snippet":function(value){
      return value.slice(0, 20)+"...";
    }
  },
  // 自定义指令
  directives:{
    "rainbow":{
      bind(el,binding,vnode){
        el.style.color = "#"+Math.random().toString(16).slice(2, 8);
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item{
    padding: 20px;
    border-radius: 5px;
    background-color: #ddd;
    margin-top: 10px;
  }
  .show-blogs{
    margin: 10px auto;
  }
  .search{
    padding-left: 10px;
    box-sizing: border-box;
    width: 100%;
    line-height: 30px;
    font-size: 16px;
    border-radius: 5px; 
    border: 1px solid #ddd;
  }

  .item a{
    text-decoration: none;
  }


</style>
