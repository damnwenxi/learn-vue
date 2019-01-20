<template>
  <div class="translateOutput">
    <!-- <h1>translateOutput</h1> -->
    <h2 class="out col-6 offset-3">{{text}}</h2>
  </div>
</template>

<script>
export default {
  name: 'translateOutput',
  props:['text'],
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.out{
  text-align: center;
  margin-top: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
}
</style>
