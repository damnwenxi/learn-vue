<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import mHeader from "./components/header";
import tab from "./components/tab";
import player from "./components/player";
export default {
  components: {
    mHeader,
    tab,
    player
  }
};
</script>


<style lang="scss">
@import "./assets/css/base.scss";
html,
body {
  width: 100%;
  height: 100%;
  background-color: $background-color;
  box-sizing: border-box;
}

* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font-color;
  outline: none;
}

a {
  text-decoration: none;
  color: $font-color;
}

li {
  list-style: none;
}
</style>
