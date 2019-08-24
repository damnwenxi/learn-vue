<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '//at.alicdn.com/t/font_1345347_qudi28g6mhs.css';

* {
    padding: 0;
    margin: 0;
    list-style: none;
    outline: none;
    text-decoration: none;
}
#app {
    padding-bottom: 120px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #cecbcb;
    background-color: rgb(35, 36, 42);

    .line {
        margin: 1em 0;
        border-bottom: none;
        border-color: #91959b;
    }
}
</style>
