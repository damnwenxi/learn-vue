<template>
  <div class="shortcut">
    <ul>
      <a
        :href="'#'+shortcut"
        class="list-item"
        v-for="shortcut in shortCutList"
        :key="shortcut"
      >{{shortcut}}</a>
    </ul>
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
  padding: 5px 0;
  width: 30px;
  font-size: 14px;
  border-radius: 15px;
  .list-item {
    display: block;
    padding-top: 5px;
    width: 30px;
    &:hover {
      color: $theme-color;
      cursor: pointer;
    }
  }
  background-color: rgba(255, 255, 255, 0.1);
}
</style>


