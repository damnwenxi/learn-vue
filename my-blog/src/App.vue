<template>
  <div id="app">

    <!-- <add-blog></add-blog>
    <show-blogs></show-blogs> -->
    <blog-header/>
    <router-view></router-view>

  </div>
</template>

<script>
import AddBlog from './components/AddBlog'
import ShowBlogs from './components/ShowBlogs'
import BlogHeader from './components/BlogHeader'


export default {
  name: 'App',
  components: {
    AddBlog,ShowBlogs,BlogHeader
  }
}
</script>

<style>
*{
  padding: 0;

  margin: 0;
}

#app {
  
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
