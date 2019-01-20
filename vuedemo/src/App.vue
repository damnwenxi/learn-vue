<template>
  <div id="app">
    <ul>
      <li><router-link to="/">test</router-link></li>
      <li><router-link to="/user">user</router-link></li>
    </ul>


    <router-view></router-view>

  </div>
</template>

<script>
  import Test from './components/Test'

  export default {
    name: 'App'
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
