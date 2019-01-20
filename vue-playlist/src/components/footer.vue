<template>
  <div class="footer">
    <footer><p>{{copyright}}</p><p>{{title}}</p></footer>
  </div>
</template>

<script>
export default {
  name: 'app-footer',
  props:{
    title:{
      type:String
    }
  },
  data () {
    return {
      copyright: '@CopyRight Node.js Vue'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footer{
    background-color: lightgreen;
    padding: 20px;
  }
  
  footer{
    text-align: center;
    color: #222;
  }
</style>
