

<template>

  <div class="blog-header">

    <router-link to="/" exact>博客总览</router-link>
    <router-link to="/add" exact>写博客</router-link>

  </div>

</template>

<script>
  export default{
    name:''
    
  }
</script>

<style scoped="">
.blog-header{
  width: 100%;
  height: 60px;
  background-color: brown;
  text-align: center;
  padding: 10px;
}
.blog-header a{
  line-height: 60px;
  text-decoration: none;
  color: #fff;
  padding: 12px;
  border-radius: 5px;
}
.router-link-active{
  background: rgba(255,255,255,.5);
  color: #444;
}

</style>


