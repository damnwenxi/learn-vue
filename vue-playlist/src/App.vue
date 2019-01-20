<template>
  <div id="app">
    <ul>
      <li><router-link to="/">home</router-link></li>
      <li><router-link to="/hello">hello</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {

    }
  }
}
</script>

<style scoped>
  
</style>
