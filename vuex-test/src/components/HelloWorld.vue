<template>
  <div class="hello">
    {{msg}}
    <p>{{count}}</p>
    <p>{{list}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["msg"],
  // computed: {
  //   count() {
  //     return this.$store.state.count;
  //   }
  // }

  // computed: mapState({
  //   count: state => state.count,
  //   list: state => state.list
  // })

  computed: mapState(["count", "list"])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
