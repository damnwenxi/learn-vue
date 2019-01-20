<template>
  <div class="header">
    <header v-on:click="changeTitle"><h1>{{title1}}</h1><p>{{title}}</p></header>

  </div>
</template>

<script>
export default {
  name: 'app-header',
  props:{
    title:{
      type:String
    }
  },
  data () {
    return {
      title1: 'Node.js Vue'
    }
  },
  methods:{
    changeTitle:function(){
      this.$emit("titleChange","子向父传值")
    }
  },
  // beforeCreate(){
  //   alert("组件实例化之前，页面不显示")
  // },
  // created(){
  //   alert("组件实例化完成，页面不显示")
  // },
  // beforeMount(){
  //   alert("组件实例化完成，尚未挂载，页面不显示，虚拟Dom尚未配置")
  // },
  // mounted(){
  //   alert("组件挂载完成，虚拟Dom配置完成，页面显示")
  // },
  // beforeUpdate(){
  //   alert("组件更新之前")
  // },
  // updated(){
  //   alert("组件更新完成，页面重新加载")
  // },
  // beforeDestory(){
  //   alert("组件销毁之前")
  // },
  // destory(){
  //   alert("组件销毁")
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    background-color: #222;
    padding: 20px;
  }
  
  header{
    text-align: center;
    color: lightgreen;
  }
</style>
