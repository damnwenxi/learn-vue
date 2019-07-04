<template>
  <div id="app">
    <h1 style="text-align:center">待办事项</h1>
    <p class="router">
      <router-link to="/">home</router-link>
      <router-link to="/about">about</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>


<style>
* {
  outline: none;
}
#app {
  box-sizing: border-box;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.router {
  text-align: center;
}

.router a {
  margin: 0 1em;
}
</style>
