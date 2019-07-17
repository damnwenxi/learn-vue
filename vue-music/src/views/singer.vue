<template>
  <div class="singer">
    <singer-list @select="selectSinger"></singer-list>
    <slot></slot>
  </div>
</template>

<script>
import singerList from "../components/part/singer-list";
import { mapMutations } from "vuex";
export default {
  name: "singer",
  data() {
    return {};
  },
  components: {
    singerList
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    ...mapMutations(["setSinger"])
  }
};
</script>

<style lang="scss" scoped>
.singer {
  position: relative;
  height: 100%;
}
</style>
