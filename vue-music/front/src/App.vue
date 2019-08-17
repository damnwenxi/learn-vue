<template>
  <div id="app">
    <div class="top">
      <m-header></m-header>
      <tab></tab>
    </div>
    <div class="clear-fixed"></div>
    <keep-alive :include="aliveComponents">
      <router-view>
        <div class="bottom-space"></div>
      </router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import mHeader from './components/header'
import tab from './components/tab'
import player from './components/player'
export default {
    components: {
        mHeader,
        tab,
        player
    },
    computed: {
        aliveComponents() {
            return [
                'recommend',
                'singer',
                'rank',
                'search',
                'singerDetail',
                'playlistDetail'
            ]
        }
    }
}
</script>


<style lang="scss">
@import './assets/css/base.scss';
html,
body {
    width: 100%;
    height: 100%;
    background-color: $background-color;
}

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: none;
}

#app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $font-color;
}
i {
    font-size: 25px;
}

.top {
    z-index: 10;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: $background-color;
}

.clear-fixed {
    height: 84px;
}
a {
    text-decoration: none;
    color: $font-color;
}

li {
    list-style: none;
}

.bottom-space {
    height: 60px;
}
</style>
