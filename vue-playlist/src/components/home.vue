<template>
  <div id="home">
    <app-header v-on:titleChange="updateTitle($event)" v-bind:title="title"></app-header>
    <h1>{{title}}</h1>
    <users></users>
    <app-footer v-bind:title="title"></app-footer>
  </div>
</template>

<script>
// <!-- 局部注册组件 -->
import Users from './Users'
import header from './header'
import footer from './footer'

export default {
  name: 'home',
  data(){
    return{
      title:'这是一个字符串',
    }
  },
  methods:{
    updateTitle(title){
      this.title=title
    }
  },
  components:{
    Users,
    'app-header':header,
    'app-footer':footer,
  }
}
</script>

<style scoped>
  
</style>
