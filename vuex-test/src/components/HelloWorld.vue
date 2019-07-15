<template>
  <div class="hello">
    {{msg}}
    <p>{{count}}</p>
    <button @click="countAdd">+</button>
    <button @click="countSub(2)">-</button>
    <!-- <p>{{idBellow3}}</p>
    <p>{{findId(3)}}</p>-->
  </div>
</template> 

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
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

  // computed: mapState(["count", "list"])
  // computed: {
  //   count() {
  //     return this.$store.getters.count;
  //   },
  //   newList() {
  //     return this.$store.getters.idBellow3;
  //   },
  //   findId() {
  //     return this.$store.getters.findId;
  //   }
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: mapMutations(["countAdd", "countSub"])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
