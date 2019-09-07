<template>
  <div class="shortcut">
      <a
        :href="'#'+shortcut"
        class="list-item"
        v-for="shortcut in shortCutList"
        :key="shortcut"
      >{{shortcut}}</a>
  </div>
</template>

<script>
export default {
  props: {
    shortCutList: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base.scss";
.shortcut {
  height: 100%;
  font-size: 1em;
  border-radius: 15px;
  padding: 0 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  .list-item {
    flex-shrink: 1;
    display: block;
    &:hover {
      color: $theme-color;
      cursor: pointer;
    }
  }
  background-color: rgba(255, 255, 255, 0.1);
}
</style>


