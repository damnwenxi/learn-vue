<template>
  <div id="singer">
    <singer-list></singer-list>
    <slot></slot>
  </div>
</template>

<script>
import singerList from "../components/part/singer-list";
export default {
  data() {
    return {};
  },
  components: {
    singerList
  }
};
</script>

<style lang="scss" scoped>
</style>
